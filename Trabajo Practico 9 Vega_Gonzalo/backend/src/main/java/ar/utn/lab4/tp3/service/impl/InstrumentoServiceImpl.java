package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.exception.NotFoundException;
import ar.utn.lab4.tp3.exception.UnauthorizedException;
import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.model.Role;
import ar.utn.lab4.tp3.repository.IInstrumentoRepository;
import ar.utn.lab4.tp3.service.ICategoriaService;
import ar.utn.lab4.tp3.service.IInstrumentoService;
import ar.utn.lab4.tp3.service.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoServiceImpl implements IInstrumentoService {
    private IInstrumentoRepository instrumentoRepository;
    private ICategoriaService categoriaService;
    private IUserService userService;
    private ObjectMapper mapper = new ObjectMapper();

    public InstrumentoServiceImpl(IInstrumentoRepository instrumentoRepository, CategoriaServiceImpl categoriaService, UserServiceImpl userService) {
        this.instrumentoRepository = instrumentoRepository;
        this.categoriaService = categoriaService;
        this.userService = userService;
    }

    @Override
    public InstrumentoDto getById(Long id) {
        return mapper.convertValue(getInstrumento(id),
                InstrumentoDto.class);
    }

    @Override
    public List<InstrumentoDto> getAll(String email) {
        if(this.userService.getUser(email).getRole() != Role.ADMIN) throw new UnauthorizedException("No tienes permisos");
        return this.instrumentoRepository.findAll().stream().map(
                instrumento -> mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }

    @Override
    public List<InstrumentoDto> getAllAltaTrue() {
        return this.instrumentoRepository.findByAltaTrue().stream().map(
                instrumento -> mapper.convertValue(instrumento, InstrumentoDto.class)).toList();
    }

    @Override
    public void saveAll(List<Instrumento> instrumentos) {
        for(Instrumento instrumento : instrumentos){
            CategoriaInstrumento categoriaInstrumento = categoriaService.getCategoria(instrumento.getCategoriaInstrumento().getId());
            if (categoriaInstrumento == null){
                categoriaInstrumento =
                        CategoriaInstrumento.builder().denominacion(instrumento.getCategoriaInstrumento().getDenominacion()).build();
            }
            instrumento.setCategoriaInstrumento(categoriaInstrumento);
            this.instrumentoRepository.save(instrumento);
        }
    }



    @Override
    public void save(InstrumentoDto instrumentoDto) {
        CategoriaInstrumento categoriaInstrumento = categoriaService.getCategoria(instrumentoDto.getCategoriaInstrumento().getId());
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
        System.out.println("CAMBIO DE ESTADO");
        Instrumento instrumento = getInstrumento(id);
        instrumento.setAlta(!instrumento.isAlta());
        this.instrumentoRepository.save(instrumento);
    }

    @Override
    public Instrumento getInstrumento(Long id) {
        return this.instrumentoRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Instrumento no encontrado"));
    }
}
