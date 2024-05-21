package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.repository.IInstrumetoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoServiceImpl implements IInstrumentoService{
    private IInstrumetoRepository instrumetoRepository;
    private ObjectMapper mapper = new ObjectMapper();
    public InstrumentoServiceImpl(IInstrumetoRepository instrumetoRepository) {
        this.instrumetoRepository = instrumetoRepository;
    }

    @Override
    public InstrumentoDto getById(Long id) {
        return mapper.convertValue(this.instrumetoRepository.findById(id).orElseThrow(()
                -> new RuntimeException("No se encuentra el instrumeto")),
                InstrumentoDto.class);
    }

    @Override
    public List<InstrumentoDto> getAll() {
        return this.instrumetoRepository.findAll().stream().map(
                instrumento -> mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }

    @Override
    public Boolean saveAll(List<Instrumento> instrumentos) {
        List<Instrumento> savedList =  this.instrumetoRepository.saveAll(instrumentos);
        return savedList.size() == instrumentos.size(); //Si se guardan todos devuelvo verdadero caso contrario falso, hubo fallo parcial o total
    }

    @Override
    public List<InstrumentoDto> getTop5Selled() {
        return this.instrumetoRepository.findTop5ByOrderByCantidadVendidaDesc().stream().map(instrumento ->
                mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }
}
