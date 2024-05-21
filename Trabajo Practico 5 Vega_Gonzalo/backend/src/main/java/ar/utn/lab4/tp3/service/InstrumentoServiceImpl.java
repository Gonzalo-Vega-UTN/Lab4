package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.dto.request.InstrumentoReqDto;
import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.repository.ICategoriaRepository;
import ar.utn.lab4.tp3.repository.IInstrumentoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoServiceImpl implements IInstrumentoService{
    private IInstrumentoRepository instrumentoRepository;
    private ICategoriaRepository categoriaRepository;
    private ObjectMapper mapper = new ObjectMapper();

    public InstrumentoServiceImpl(IInstrumentoRepository instrumentoRepository, ICategoriaRepository categoriaRepository) {
        this.instrumentoRepository = instrumentoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public InstrumentoDto getById(Long id) {
        return mapper.convertValue(this.instrumentoRepository.findById(id).orElseThrow(()
                -> new RuntimeException("No se encuentra el instrumeto")),
                InstrumentoDto.class);
    }

    @Override
    public List<InstrumentoDto> getAll() {
        return this.instrumentoRepository.findAll().stream().map(
                instrumento -> mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }

    @Override
    public void saveAll(List<Instrumento> instrumentos) {
        for(Instrumento instrumento : instrumentos){
            CategoriaInstrumento categoriaInstrumento = categoriaRepository.findById(instrumento.getCategoriaInstrumento().getId()).orElse(null);
            System.out.println(categoriaInstrumento);
            if (categoriaInstrumento == null){
                categoriaInstrumento =
                        CategoriaInstrumento.builder().denominacion(instrumento.getCategoriaInstrumento().getDenominacion()).build();
            }
            instrumento.setCategoriaInstrumento(categoriaInstrumento);
            System.out.println(instrumento);
            this.instrumentoRepository.save(instrumento);
        }
    }

    @Override
    public void save(InstrumentoReqDto instrumentoReqDto) {
        System.out.println(instrumentoReqDto);
        CategoriaInstrumento categoriaInstrumento = categoriaRepository.findById(instrumentoReqDto.getCategoriaInstrumento().getId()).orElse(null);
        Instrumento instrumento = mapper.convertValue(instrumentoReqDto, Instrumento.class);
        instrumento.setCategoriaInstrumento(categoriaInstrumento);
        instrumentoRepository.save(instrumento);
    }

    @Override
    public void save(InstrumentoDto instrumentoDto) {
        System.out.println(instrumentoDto);
        CategoriaInstrumento categoriaInstrumento = categoriaRepository.findById(instrumentoDto.getCategoriaInstrumento().getId()).orElse(null);
        Instrumento instrumento = mapper.convertValue(instrumentoDto, Instrumento.class);
        instrumento.setCategoriaInstrumento(categoriaInstrumento);
        instrumentoRepository.save(instrumento);
    }

    @Override
    public List<InstrumentoDto> getTop5Selled() {
        return this.instrumentoRepository.findTop5ByOrderByCantidadVendidaDesc().stream().map(instrumento ->
                mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }

    @Override
    public void delete(Long id) {
        Instrumento instrumento = this.instrumentoRepository.findById(id).orElseThrow(()
                -> new RuntimeException("No se encuentra el instrumeto"));
        instrumento.setCategoriaInstrumento(null);
        
        this.instrumentoRepository.delete(instrumento);
    }
}
