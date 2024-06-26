package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.exception.NotFoundException;
import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.model.Pedido;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReporteServiceImpl {
    /*Fuentes*/
    protected static Font texto = FontFactory.getFont(FontFactory.HELVETICA, 12);
    protected static Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
    protected static Font titulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

    private PedidoServiceImpl pedidoService;
    private InstrumentoServiceImpl instrumentoService;

    public ReporteServiceImpl(PedidoServiceImpl pedidoService, InstrumentoServiceImpl instrumentoService) {
        this.pedidoService = pedidoService;
        this.instrumentoService = instrumentoService;
    }

    private  ByteArrayInputStream generateExcelReport(List<Pedido> pedidos) throws IOException {
        try (Workbook workbook = new SXSSFWorkbook(50)) {
            Sheet sheet = workbook.createSheet("Pedidos");
            createHeaderRow(sheet);
            int rowNum = 1; //Avanzamos a la segunda fila porque la primera ya tiene el header
            for (Pedido pedido : pedidos) {
                createPedidoRows(pedido, sheet, rowNum);
                rowNum += pedido.getPedidoDetalles().size();
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());
        }
    }

    private void createHeaderRow(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        List<String> headers = List.of("ID", "Fecha Pedido", "Instrumento", "Marca", "Modelo", "Precio", "Cantidad", "Costo de Envío", "Subtotal", "Total");
        for (int column = 0; column < headers.size(); column++) {
            headerRow.createCell(column).setCellValue(headers.get(column));
        }

    }

    private void createPedidoRows(Pedido pedido, Sheet sheet, int rowIndex) {
       int row2 = rowIndex;
       Double total = 0.0;
        for (PedidoDetalle pedidoDetalle : pedido.getPedidoDetalles()){
            Row row = sheet.createRow(row2);
            row.createCell(0).setCellValue(pedido.getId());
            row.createCell(1).setCellValue(pedido.getFechaPedido().toString());
            double costoEnvio = pedidoDetalle.getInstrumento().getCostoEnvio().equals("G") ? 0.0 : Double.parseDouble(pedidoDetalle.getInstrumento().getCostoEnvio());
            double subTotal = pedidoDetalle.getCantidad() * Double.parseDouble(pedidoDetalle.getInstrumento().getPrecio());
            row.createCell(2).setCellValue(pedidoDetalle.getInstrumento().getInstrumento());
            row.createCell(3).setCellValue(pedidoDetalle.getInstrumento().getMarca());
            row.createCell(4).setCellValue(pedidoDetalle.getInstrumento().getModelo());
            row.createCell(5).setCellValue(pedidoDetalle.getInstrumento().getPrecio());
            row.createCell(6).setCellValue(pedidoDetalle.getCantidad());
            row.createCell(7).setCellValue(String.valueOf(costoEnvio));
            row.createCell(8).setCellValue(String.valueOf(subTotal));
            row.createCell(9).setCellValue(String.valueOf(pedido.getTotalPedido() ));
            row2++;

        }


    }


    public static void addMetaData(Document document) {
        document.addTitle("Detalle del Instrumento");
        document.addSubject("Informe PDF del Instrumento");
        document.addKeywords("Instrumento, Detalle, PDF");
        document.addAuthor("Tu Nombre");
        document.addCreator("Tu Nombre");
    }

    public static void addEmptyLine(Document document, int number) throws DocumentException {
        for (int i = 0; i < number; i++) {
            document.add(new Paragraph(" "));
        }
    }

    public static void setLineaReporte(Document document) throws DocumentException {
        PdfPTable linea = new PdfPTable(1);
        linea.setWidthPercentage(100.0f);
        PdfPCell cellOne = new PdfPCell(new Paragraph(""));
        cellOne.setBorder(Rectangle.BOTTOM);
        cellOne.setBorder(Rectangle.TOP);
        linea.addCell(cellOne);

        document.add(linea);
    }

    public static ByteArrayOutputStream generateInstrumentoPDF(Instrumento instrumento) throws DocumentException, MalformedURLException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            Document document = new Document(PageSize.A4, 30, 30, 0, 30);
            addMetaData(document);

            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Encabezado
            PdfPTable tableCabecera = new PdfPTable(1);
            tableCabecera.setWidthPercentage(100f);

            PdfPCell cell = new PdfPCell(new Paragraph("Detalle del Instrumento", titulo));
            cell.setBorder(Rectangle.NO_BORDER);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            tableCabecera.addCell(cell);

            document.add(tableCabecera);

            addEmptyLine(document, 1);
            setLineaReporte(document);
            // Fin encabezado

            // Contenido del instrumento
            ClassLoader classLoader = ReporteServiceImpl.class.getClassLoader();
            String imagePath = instrumento.getImagen();
            Image imgInstrumento = null;

            try {
                if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
                    // Imagen desde URL
                    URL imageUrl = new URL(imagePath);
                    InputStream imgStream = imageUrl.openStream();
                    imgInstrumento = Image.getInstance(IOUtils.toByteArray(imgStream));
                } else {
                    // Imagen desde recursos locales
                    String resourcePath = "img/" + imagePath;
                    InputStream imgStream = classLoader.getResourceAsStream(resourcePath);
                    if (imgStream != null) {
                        imgInstrumento = Image.getInstance(IOUtils.toByteArray(imgStream));
                    }
                }

                if (imgInstrumento != null) {
                    imgInstrumento.scaleAbsolute(200f, 200f);
                    imgInstrumento.setAlignment(Element.ALIGN_CENTER);
                    document.add(imgInstrumento);
                } else {
                    // Si la imagen no se encuentra, agregar una imagen predeterminada o un mensaje de error
                    Paragraph errorParagraph = new Paragraph("Imagen no encontrada", texto);
                    errorParagraph.setAlignment(Element.ALIGN_CENTER);
                    document.add(errorParagraph);
                }
            } catch (Exception e) {
                // Manejo de errores
                e.printStackTrace();
                Paragraph errorParagraph = new Paragraph("Error al cargar la imagen", texto);
                errorParagraph.setAlignment(Element.ALIGN_CENTER);
                document.add(errorParagraph);
            }

            addEmptyLine(document, 1);

            Paragraph paragraph = new Paragraph(instrumento.getInstrumento(), titulo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);

            addEmptyLine(document, 1);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(80);
            table.setHorizontalAlignment(Element.ALIGN_CENTER);

            table.addCell(new Phrase("Precio:", textoBold));
            table.addCell(new Phrase("$" + instrumento.getPrecio(), texto));

            table.addCell(new Phrase("Marca:", textoBold));
            table.addCell(new Phrase(instrumento.getMarca(), texto));

            table.addCell(new Phrase("Modelo:", textoBold));
            table.addCell(new Phrase(instrumento.getModelo(), texto));

            table.addCell(new Phrase("Descripción:", textoBold));
            table.addCell(new Phrase(instrumento.getDescripcion(), texto));

            table.addCell(new Phrase("Costo de envío:", textoBold));
            if ("G".equals(instrumento.getCostoEnvio())) {
                table.addCell(new Phrase("Envío gratis a todo el país", texto));
            } else {
                table.addCell(new Phrase("Costo de envío: $" + instrumento.getCostoEnvio(), texto));
            }

            table.addCell(new Phrase("Categoría:", textoBold));
            table.addCell(new Phrase(instrumento.getCategoriaInstrumento().getDenominacion(), texto));

            document.add(table);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return outputStream;
    }


    public List<Object[]> obtenerCantidadPedidosPorMeses(Integer anio) {
        return pedidoService.obtenerCantidadPedidos(anio);

    }

    public List<Object[]> obtenerCantidadPedidos() {
        return pedidoService.obtenerCantidadPedidos();

    }

    public ByteArrayInputStream obtenerExcelPedidosPorRangoFechas(LocalDate desde, LocalDate hasta) {
        List<Pedido> pedidos = this.pedidoService.obtenerPedidosPorFecha(desde, hasta);
        if(pedidos.isEmpty()) throw new NotFoundException("No hay pedidos en esas fechas");
        try {
            return generateExcelReport(pedidos);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new NotFoundException("Hubo un Error!");
        }

    }

    public List<Object[]> obtenerPedidosAgrupadosPorInstrumento(){
        return this.pedidoService.obtenerPedidosPorInstrumento();
    }

    public ResponseEntity<byte[]> generarPdf(Long instrumentoId) {
        Instrumento instrumento = this.instrumentoService.getInstrumento(instrumentoId);

        try {
            ByteArrayOutputStream pdfStream = generateInstrumentoPDF(instrumento);

            byte[] pdfBytes = pdfStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "detalle_instrumento.pdf");
            headers.setContentLength(pdfBytes.length);

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
