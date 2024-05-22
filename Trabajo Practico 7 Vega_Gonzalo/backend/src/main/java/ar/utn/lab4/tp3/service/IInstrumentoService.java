package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.dto.request.InstrumentoReqDto;
import ar.utn.lab4.tp3.model.Instrumento;

import java.util.List;

public interface IInstrumentoService {

    InstrumentoDto getById(Long id);
    List<InstrumentoDto> getAll();
    void saveAll(List<Instrumento> instrumentos);
    void save(InstrumentoReqDto instrumentoReqDto);
    void save(InstrumentoDto instrumentoDto);
    List<InstrumentoDto> getTop5Selled();

    void delete(Long id);
}
