package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.service.IInstrumentoService;
import ar.utn.lab4.tp3.service.impl.InstrumentoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin("*")
public class InstrumentoController {
   private IInstrumentoService instrumentoService;
    public InstrumentoController(InstrumentoServiceImpl instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(
            @RequestParam("email") Optional<String> email) {
        List<InstrumentoDto> instrumentos;
        if (email.isPresent()) {
            System.out.println("Fetching all instruments for admin: " + email.get());
            instrumentos = instrumentoService.getAll(email.get());
        } else {
            System.out.println("Fetching instruments with 'alta' status");
            instrumentos = instrumentoService.getAllAltaTrue();
        }
        return ResponseEntity.ok().body(instrumentos);
    }
    @DeleteMapping("/{idInstrumento}")
    public ResponseEntity<?> delete(@PathVariable("idInstrumento") Long id){
        instrumentoService.delete(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/top5")
    public ResponseEntity<?> getTop5Instrumentos(){
        return ResponseEntity.ok().body(instrumentoService.getTop5Selled());
    }

    @GetMapping("/{idInstrumento}")
    public ResponseEntity<?> getAll(@PathVariable("idInstrumento") Long id){
        return ResponseEntity.ok().body(instrumentoService.getById(id));
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody InstrumentoDto instrumentoDto){
        instrumentoService.save(instrumentoDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody InstrumentoDto instrumentoReqDto){
        instrumentoService.save(instrumentoReqDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
