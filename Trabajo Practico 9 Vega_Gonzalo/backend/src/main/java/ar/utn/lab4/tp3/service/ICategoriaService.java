package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.CategoriaInstrumentoDto;
import ar.utn.lab4.tp3.model.CategoriaInstrumento;

import java.util.List;

public interface ICategoriaService {
    void save(CategoriaInstrumento categoriaInstrumento);
    Boolean saveAll(List<CategoriaInstrumento> instrumentos);

    CategoriaInstrumento getCategoria(Long id);

    List<CategoriaInstrumentoDto> getAll();
}
