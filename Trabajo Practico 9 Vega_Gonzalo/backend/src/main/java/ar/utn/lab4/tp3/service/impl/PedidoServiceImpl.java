package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.dto.PedidoDetalleResp;
import ar.utn.lab4.tp3.dto.PedidoResp;
import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.model.Pedido;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import ar.utn.lab4.tp3.model.PreferenceMP;
import ar.utn.lab4.tp3.repository.IInstrumentoRepository;
import ar.utn.lab4.tp3.repository.IPedidoRepository;
import ar.utn.lab4.tp3.repository.IPreferenceMP;
import ar.utn.lab4.tp3.service.IInstrumentoService;
import ar.utn.lab4.tp3.service.IPedidoService;
import ar.utn.lab4.tp3.service.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoServiceImpl implements IPedidoService {
    private IPedidoRepository pedidoRepository;
    private IInstrumentoRepository instrumentoRepository;
    private final IInstrumentoService instrumentoService;
    private final IPreferenceMP preferenceRepository;
    private final IUserService userService;
    private ObjectMapper mapper;

    public PedidoServiceImpl(IPedidoRepository pedidoRepository, IInstrumentoRepository instrumentoRepository,
            IPreferenceMP preferenceRepository, UserServiceImpl userService,
            InstrumentoServiceImpl instrumentoService) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
        this.preferenceRepository = preferenceRepository;
        this.userService = userService;
        this.instrumentoService = instrumentoService;
        mapper = new ObjectMapper();
        mapper.registerModule(new JSR310Module());
    }

    @Override
    public void delete(Long id) {
        var pedido = this.pedidoRepository.findById(id);
        if (pedido.isEmpty()) {
            throw new RuntimeException("Pedido no encontrado");
        }
        this.pedidoRepository.delete(pedido.get());
    }

    @Override 
    public PedidoResp create(PedidoReqDto request) {
        System.out.println(request.getFechaPedido());
        final Pedido pedido = Pedido.builder()
                .fechaPedido(request.getFechaPedido())
                .id(null)
                .totalPedido(request.getTotalPedido())
                .user(this.userService.getUser(request.getUserId()))
                .fechaPedido(request.getFechaPedido())
                .build();
        pedido.getUser().getPedidos().add(pedido);
        request.getPedidoDetalles().forEach(detalle -> System.out.println(detalle.getId()));
        List<PedidoDetalle> detalles = request.getPedidoDetalles().stream().map(detalle -> PedidoDetalle.builder()
                .cantidad(detalle.getCantidad())
                .id(null)
                .instrumento(this.instrumentoService.getInstrumento(detalle.getInstrumento().getId()))
                .pedido(pedido)
                .build()).toList();
        detalles.forEach(detalle -> System.out.println(detalle.getInstrumento().getId()));
        pedido.setPedidoDetalles(detalles);
        Pedido savedPedido = this.pedidoRepository.save(pedido);
        return convertToPedidoResponse(savedPedido);
    }

    private PedidoResp convertToPedidoResponse(Pedido p) {
        PedidoResp response = PedidoResp.builder()
             .id(p.getId())
             .fechaPedido(p.getFechaPedido())
             .totalPedido(p.getTotalPedido())
             .userId(p.getUser().getId())
             .pedidoDetalles(p.getPedidoDetalles().stream().map(detalle -> PedidoDetalleResp.builder()
                     .id(detalle.getId())
                     .cantidad(detalle.getCantidad())
                     .instrumento(detalle.getInstrumento())
                     .build()).toList())
             .build();

        return response;
    }

    @Override
    public List<PedidoReqDto> getAll() {
        return this.pedidoRepository.findAll().stream().map(pedido -> mapper.convertValue(pedido, PedidoReqDto.class))
                .toList();
    }

    @Override
    public PreferenceMP createPreference(PedidoReqDto pedidoReqDto) {
        Pedido pedido = mapper.convertValue(pedidoReqDto, Pedido.class);
        try {
            MercadoPagoConfig.setAccessToken("TEST-4348060094658217-052007-d8458fa36a2d40dd8023bfcb9f27fd4e-1819307913");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id(String.valueOf(pedidoReqDto.getId()))
                    .title("Pedido Buen sabor")
                    .description("Pedido realizado desde el carrito de compras")
                    .pictureUrl("https://img-global.cpcdn.com/recipes/0709fbb52d87d2d7/1200x630cq70/photo.jpg")
                    .quantity(1)
                    .currencyId("ARG")
                    .unitPrice(BigDecimal.valueOf(pedido.getTotalPedido()))
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:5173/mpsuccess")
                    .pending("http://localhost:5173/mppending")
                    .failure("http://localhost:5173/mpfailure").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            PreferenceMP mpPreference = new PreferenceMP();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());
            this.preferenceRepository.save(mpPreference);
            return mpPreference;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Object[]> obtenerCantidadPedidos(Integer anio) {
        Object[] encabezado = {"Mes", "Cantidad de Pedidos"};
        List<Object[]> listado = new ArrayList<>();
        listado.add(encabezado);
        listado.addAll(this.pedidoRepository.findCantidadInstrumentosVendidosPerOneYear(anio));
        transformMonthNumberToString(listado);
        return listado;
    }
    public List<Object[]> obtenerCantidadPedidos() {
        Object[] encabezado = {"Año", "Cantidad de Pedidos"};
        List<Object[]> listado = new ArrayList<>();
        listado.add(encabezado);
        listado.addAll(this.pedidoRepository.findCantidadInstrumentosVendidos());
        transformYearToString(listado);
        return listado;
    }
    private void transformYearToString(List<Object[]> listado) {
        for (Object[] obj : listado) {
           obj[0] = String.valueOf(obj[0]);
        }
    }
    private static final String[] MONTHS = {"enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"};

    private void transformMonthNumberToString(List<Object[]> listado) {
        // Arranca en 1 para evitar transformar el header
        for (int i = 1; i < listado.size(); i++) {
            Object[] obj = listado.get(i);
            int monthNumber = (int) obj[0];

            if (monthNumber < 1 || monthNumber > MONTHS.length) {
                // Handle invalid month numbers
                obj[0] = "Mes inválido";
                continue;
            }
            String monthString = MONTHS[monthNumber - 1];
            obj[0] = monthString; // Assign the new value
        }
    }


    public List<Pedido> obtenerPedidosPorFecha(LocalDate desde, LocalDate hasta) {
        return this.pedidoRepository.findPedidosConDetallesByFechaRange(desde, hasta);
    }
}
