package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.request.PedidoDetalleReqDto;
import ar.utn.lab4.tp3.dto.request.PedidoReqDto;

import java.util.List;

public interface IPedidoDetalleService {
    List<PedidoDetalleReqDto> getAll();

    void delete(Long id);

    PedidoDetalleReqDto create(PedidoReqDto request);
}
