package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.model.Instrumento;

import java.util.List;

public interface IInstrumentoService {

    InstrumentoDto getById(Long id);
    List<InstrumentoDto> getAll();
    Boolean saveAll(List<Instrumento> instrumentos);
    List<InstrumentoDto> getTop5Selled();
}
