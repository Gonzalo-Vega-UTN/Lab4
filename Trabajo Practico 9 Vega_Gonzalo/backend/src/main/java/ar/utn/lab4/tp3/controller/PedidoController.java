package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.service.IPedidoService;
import ar.utn.lab4.tp3.service.impl.PedidoServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin("*")
public class PedidoController {

    private IPedidoService pedidoService;

    public PedidoController(PedidoServiceImpl pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping("")
    public ResponseEntity<?> delete(@RequestBody PedidoReqDto reques){
        return ResponseEntity.ok().body(pedidoService.create(reques));
    }
    @DeleteMapping("/{idPedido}")
    public ResponseEntity<?> delete(@PathVariable("idPedido") Long id){
        pedidoService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(pedidoService.getAll());
    }

    @PostMapping("/create-preference-mp")
    public ResponseEntity<?> createPreferenceMP(@RequestBody PedidoReqDto pedido){
        System.out.println("EN CONTROLER");
        System.out.println(pedido);
        return ResponseEntity.ok(pedidoService.createPreference(pedido));
    }
}
