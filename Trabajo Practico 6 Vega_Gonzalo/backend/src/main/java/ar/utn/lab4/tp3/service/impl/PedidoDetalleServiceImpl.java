package ar.utn.lab4.tp3.service.impl;


import ar.utn.lab4.tp3.dto.request.PedidoDetalleReqDto;
import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import ar.utn.lab4.tp3.repository.IPedidoDetalleRepository;
import ar.utn.lab4.tp3.service.IPedidoDetalleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoDetalleServiceImpl implements IPedidoDetalleService {
    private IPedidoDetalleRepository pedidoDetalleRepository;
    private ObjectMapper mapper = new ObjectMapper();


    public PedidoDetalleServiceImpl(IPedidoDetalleRepository pedidoDetalleRepository) {
        this.pedidoDetalleRepository = pedidoDetalleRepository;
    }

    @Override
    public List<PedidoDetalleReqDto> getAll() {
        return this.pedidoDetalleRepository.findAll().stream().map(pedidoDetalle -> mapper.convertValue(pedidoDetalle, PedidoDetalleReqDto.class)).toList();
    }

    @Override
    public void delete(Long id) {
        throw new RuntimeException("IMPLEMENTAR");
    }

    @Override
    public PedidoDetalleReqDto create(PedidoReqDto request) {
        return mapper.convertValue(this.pedidoDetalleRepository.save(mapper.convertValue(request, PedidoDetalle.class)), PedidoDetalleReqDto.class);

    }
}
