package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;

import java.util.List;

public interface IPedidoService {
    void delete(Long id);

    PedidoReqDto create(PedidoReqDto request);

    List<PedidoReqDto> getAll();
}
