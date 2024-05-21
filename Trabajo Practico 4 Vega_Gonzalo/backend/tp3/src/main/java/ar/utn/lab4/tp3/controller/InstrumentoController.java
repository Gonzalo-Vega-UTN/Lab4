package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.service.IInstrumentoService;
import ar.utn.lab4.tp3.service.InstrumentoServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin("*")
public class InstrumentoController {
    IInstrumentoService instrumentoService;
    public InstrumentoController(InstrumentoServiceImpl instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok().body(instrumentoService.getAll());
    }
    @GetMapping("/top5")
    public ResponseEntity<?> getTop5Instrumentos(){
        return ResponseEntity.ok().body(instrumentoService.getTop5Selled());
    }

    @GetMapping("/{idInstrumento}")
    public ResponseEntity<?> getAll(@PathVariable("idInstrumento") Long id){
        return ResponseEntity.ok().body(instrumentoService.getById(id));
    }
}
