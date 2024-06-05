package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.service.impl.ReporteServiceImpl;
import org.apache.poi.util.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reportes")
public class ReportesController {

    private ReporteServiceImpl reporteService;

    public ReportesController(ReporteServiceImpl reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/excel")
    public ResponseEntity<byte[]> generateExcelReport(@RequestParam("desde")LocalDate desde,
                                                      @RequestParam("hasta")LocalDate hasta) {
        try {
            ByteArrayInputStream excelStream = reporteService.obtenerExcelPedidosPorRangoFechas(desde, hasta);
            byte[] excelBytes = IOUtils.toByteArray(excelStream);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "reporte_pedidos.xlsx");
            headers.setContentLength(excelBytes.length);

            return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/pdf/{instrumentoId}")
//    public ResponseEntity<byte[]> generatePdfReport(@PathVariable Long instrumentoId) {
//        try {
//            Optional<Instrumento> optionalInstrumento = instrumentoService.buscarXid(instrumentoId);
//            if (optionalInstrumento.isPresent()) {
//                Instrumento instrumento = optionalInstrumento.get();
//                ByteArrayOutputStream pdfStream = ReportGenerator.generateInstrumentoPDF(instrumento);
//
//                byte[] pdfBytes = pdfStream.toByteArray();
//
//                HttpHeaders headers = new HttpHeaders();
//                headers.setContentType(MediaType.APPLICATION_PDF);
//                headers.setContentDispositionFormData("attachment", "detalle_instrumento.pdf");
//                headers.setContentLength(pdfBytes.length);
//
//                return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/bars/year/{year}")
    public List<List<Object>> obtenerGraficoBarraPorMeses(@PathVariable Integer year) {
        return reporteService.obtenerCantidadPedidosPorMeses(year);
    }

    @GetMapping("/bars")
    public List<List<Object>> obtenerGraficoBarraPorAnios() {
        return reporteService.obtenerCantidadPedidos();
    }
}
