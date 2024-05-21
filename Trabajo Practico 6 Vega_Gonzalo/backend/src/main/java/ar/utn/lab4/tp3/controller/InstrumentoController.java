package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import ar.utn.lab4.tp3.dto.request.InstrumentoReqDto;
import ar.utn.lab4.tp3.service.IInstrumentoService;
import ar.utn.lab4.tp3.service.impl.InstrumentoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin("*")
public class InstrumentoController {
   private IInstrumentoService instrumentoService;
    public InstrumentoController(InstrumentoServiceImpl instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok().body(instrumentoService.getAll());
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
    public ResponseEntity<?> create(@RequestBody InstrumentoReqDto instrumentoReqDto){
        instrumentoService.save(instrumentoReqDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody InstrumentoDto instrumentoReqDto){
        instrumentoService.save(instrumentoReqDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
