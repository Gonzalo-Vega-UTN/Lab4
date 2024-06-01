package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.model.PreferenceMP;

import java.util.List;

public interface IPedidoService {
    void delete(Long id);

    PedidoReqDto create(PedidoReqDto request);

    List<PedidoReqDto> getAll();

    PreferenceMP createPreference(PedidoReqDto pedido);
}
