package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.dto.request.PedidoReqDto;
import ar.utn.lab4.tp3.service.IPedidoDetalleService;
import ar.utn.lab4.tp3.service.impl.PedidoDetalleServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos/detalles")
@CrossOrigin("*")
public class PedidoDetalleController {

    private IPedidoDetalleService pedidoDetalleService;

    public PedidoDetalleController(PedidoDetalleServiceImpl pedidoDetalleServiceImpl) {
        this.pedidoDetalleService = pedidoDetalleServiceImpl;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok().body(pedidoDetalleService.getAll());
    }

    @DeleteMapping("/{idPedidoDetalle}")
    public ResponseEntity<?> delete(@PathVariable("idPedidoDetalle") Long id){
        pedidoDetalleService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody PedidoReqDto request){
        return ResponseEntity.ok(pedidoDetalleService.create(request));
    }
}
