package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.model.Pedido;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import ar.utn.lab4.tp3.model.PreferenceMP;
import ar.utn.lab4.tp3.repository.IInstrumentoRepository;
import ar.utn.lab4.tp3.repository.IPedidoRepository;
import ar.utn.lab4.tp3.repository.IPreferenceMP;
import ar.utn.lab4.tp3.service.IPedidoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoServiceImpl implements IPedidoService {
    private IPedidoRepository pedidoRepository;
    private IInstrumentoRepository instrumentoRepository;
    private final IPreferenceMP preferenceRepository;
    private ObjectMapper mapper = new ObjectMapper();

    public PedidoServiceImpl(IPedidoRepository pedidoRepository, IInstrumentoRepository instrumentoRepository, IPreferenceMP preferenceRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
        this.preferenceRepository = preferenceRepository;
    }

    @Override
    public void delete(Long id) {
        var pedido = this.pedidoRepository.findById(id);
        if(pedido.isEmpty()){
            throw new RuntimeException("Pedido no encontrado");
        }
        this.pedidoRepository.delete(pedido.get());
    }

    @Override
    public PedidoReqDto create(PedidoReqDto request) {
        Pedido pedido = mapper.convertValue(request, Pedido.class);
        for (PedidoDetalle detalle : pedido.getPedidoDetalles()) {
            detalle.setPedido(pedido);
            detalle.setInstrumento(this.instrumentoRepository.findById(detalle.getInstrumento().getId()).get());
    }

        //pedido.getPedidoDetalles().forEach(item -> item.setPedido(pedido));
        return mapper.convertValue(this.pedidoRepository.save(pedido), PedidoReqDto.class);
    }

    @Override
    public List<PedidoReqDto> getAll() {
        return null;
    }

    @Override
    public PreferenceMP createPreference(PedidoReqDto pedidoReqDto) {
        Pedido pedido = mapper.convertValue(pedidoReqDto, Pedido.class);
        System.out.println(pedido.getTotalPedido());
        try {
            MercadoPagoConfig.setAccessToken("TEST-4958988049688747-052018-164480fcc3cbd0aeef414a5b009682c1-227628785");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id("1234")
                    .title("Pedido Buen sabor")
                    .description("Pedido realizado desde el carrito de compras")
                    .pictureUrl("https://img-global.cpcdn.com/recipes/0709fbb52d87d2d7/1200x630cq70/photo.jpg")
                    .quantity(1)
                    .currencyId("ARG")
                    .unitPrice(BigDecimal.valueOf(pedido.getTotalPedido()))
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/mpsuccess")
                    .pending("http://localhost:5173/mppending").failure("http://localhost:5173/mpfailure").build();

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
}
