package ar.utn.lab4.tp3.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.model.Pedido;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import ar.utn.lab4.tp3.repository.IInstrumentoRepository;
import ar.utn.lab4.tp3.repository.IPedidoRepository;
import ar.utn.lab4.tp3.service.IPedidoService;

@Service
public class PedidoServiceImpl implements IPedidoService {
    private IPedidoRepository pedidoRepository;
    private IInstrumentoRepository instrumentoRepository;
    private ObjectMapper mapper = new ObjectMapper();

    public PedidoServiceImpl(IPedidoRepository pedidoRepository, IInstrumentoRepository instrumentoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
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
}
