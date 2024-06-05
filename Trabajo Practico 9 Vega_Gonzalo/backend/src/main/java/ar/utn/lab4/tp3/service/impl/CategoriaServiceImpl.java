package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.dto.CategoriaInstrumentoDto;
import ar.utn.lab4.tp3.exception.NotFoundException;
import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import ar.utn.lab4.tp3.repository.ICategoriaRepository;
import ar.utn.lab4.tp3.service.ICategoriaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements ICategoriaService {
    private ICategoriaRepository categoriaRepository;
    private ObjectMapper mapper = new ObjectMapper();

    public CategoriaServiceImpl(ICategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public void save(CategoriaInstrumento categoriaInstrumento) {
        categoriaRepository.save(categoriaInstrumento);
    }

    @Override
    public Boolean saveAll(List<CategoriaInstrumento> categoriaInstrumentos) {
        List<CategoriaInstrumento> savedList =  this.categoriaRepository.saveAll(categoriaInstrumentos);
        return savedList.size() == categoriaInstrumentos.size(); //Si se guardan todos devuelvo verdadero caso contrario falso, hubo fallo parcial o total
    }

    @Override
    public CategoriaInstrumento getCategoria(Long id) {
        return this.categoriaRepository.findById(id).orElseThrow(() -> new NotFoundException("Categoría no encontrada"));
    }

    @Override
    public List<CategoriaInstrumentoDto> getAll() {
        return this.categoriaRepository.findAll().stream().map(
                categoria ->mapper.convertValue(categoria, CategoriaInstrumentoDto.class)
                ).toList();
    }
}
