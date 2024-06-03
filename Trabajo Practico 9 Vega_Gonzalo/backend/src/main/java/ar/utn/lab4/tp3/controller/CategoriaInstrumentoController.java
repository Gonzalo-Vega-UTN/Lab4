package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.dto.CategoriaInstrumentoDto;
import ar.utn.lab4.tp3.service.ICategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin("*")
public class CategoriaInstrumentoController {

    private ICategoriaService categoriaService;

    public CategoriaInstrumentoController(ICategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        List<CategoriaInstrumentoDto> lista = categoriaService.getAll();
        lista.forEach(System.out::println);
        return ResponseEntity.ok().body(lista);
    }
}
