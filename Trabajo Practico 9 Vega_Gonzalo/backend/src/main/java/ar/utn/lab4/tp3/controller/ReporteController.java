package ar.utn.lab4.tp3.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.utn.lab4.tp3.service.impl.ReporteService;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin("*")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/pie-chart/date/{date}")
    public ResponseEntity<?> getPieChartGroupedByDate(@PathVariable LocalDate date) {
        return new ResponseEntity(null, HttpStatus.OK);
    }

    @GetMapping("/pie-chart/instrumento/{idInstrumento}")
    public ResponseEntity<?> getPieChartGroupedByInstrumento(@PathVariable Long idInstrumento) {
        return new ResponseEntity(null, HttpStatus.OK);
    }

    @GetMapping("/excel/user/{idUser}")
    public ResponseEntity<?> getExcelFilteredByDate(@PathVariable Long idUser,
            @PathParam("desde") LocalDate desde,
            @PathParam("hasta") LocalDate hasta) {
        return new ResponseEntity(null, HttpStatus.OK);
    }

    @GetMapping("/pdf/instrumento/{idInstrumento}")
    public ResponseEntity<?> getPdfDetalleInstrumento(@PathVariable Long idInstrumento) {
        return new ResponseEntity(null, HttpStatus.OK);
    }

}
