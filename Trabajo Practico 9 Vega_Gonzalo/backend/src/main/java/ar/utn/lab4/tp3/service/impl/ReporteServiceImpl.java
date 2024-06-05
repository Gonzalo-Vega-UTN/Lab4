package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.model.Pedido;
import ar.utn.lab4.tp3.model.PedidoDetalle;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteServiceImpl {
    /*Fuentes*/
    protected static Font texto = FontFactory.getFont(FontFactory.HELVETICA, 12);
    protected static Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
    protected static Font titulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

    private PedidoServiceImpl pedidoService;

    public ReporteServiceImpl(PedidoServiceImpl pedidoService) {
        this.pedidoService = pedidoService;
    }

    /*EXEL*/
    private  ByteArrayInputStream generateExcelReport(List<Pedido> pedidos) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Pedidos");
            createHeaderRow(sheet);
            int rowNum = 1;
            for (Pedido pedido : pedidos) {
                createPedidoRows(pedido, sheet, rowNum);
                rowNum += pedido.getPedidoDetalles().size();
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());
        }
    }

    private static void createHeaderRow(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Fecha Pedido");
        headerRow.createCell(2).setCellValue("Instrumento");
        headerRow.createCell(3).setCellValue("Marca");
        headerRow.createCell(4).setCellValue("Modelo");
        headerRow.createCell(5).setCellValue("Cantidad");
        headerRow.createCell(6).setCellValue("Precio");
        headerRow.createCell(7).setCellValue("Costo de Envío");
        headerRow.createCell(8).setCellValue("SubTotal");
        headerRow.createCell(9).setCellValue("Total");
    }

    public static void createPedidoRows(Pedido pedido, Sheet sheet, int rowIndex) {
        int mergedRows = pedido.getPedidoDetalles().size();

        // Crear todas las filas necesarias
        for (int i = 0; i < mergedRows; i++) {
            Row row = sheet.createRow(rowIndex + i);
            if (i == 0) {
                row.createCell(0).setCellValue(pedido.getId());
                row.createCell(1).setCellValue(pedido.getFechaPedido().toString());
                row.createCell(10).setCellValue(pedido.getTotalPedido());
            } else {
                // Si no es la primera fila, solo creamos celdas en las columnas restantes
                for (int j = 0; j <= 10; j++) {
                    row.createCell(j);
                }
            }
            PedidoDetalle detalle = pedido.getPedidoDetalles().get(i);
            row.createCell(3).setCellValue(detalle.getInstrumento().getInstrumento());
            row.createCell(4).setCellValue(detalle.getInstrumento().getMarca());
            row.createCell(5).setCellValue(detalle.getInstrumento().getModelo());
            row.createCell(6).setCellValue(Double.parseDouble(detalle.getInstrumento().getPrecio()));

            String costoEnvioStr = detalle.getInstrumento().getCostoEnvio();
            double costoEnvio = 0.0;
            try {
                costoEnvio = Double.parseDouble(costoEnvioStr);
            } catch (NumberFormatException e) {
                // El valor del costo de envío no es numérico, se asume 'G'
            }
            row.createCell(7).setCellValue(costoEnvio);
            row.createCell(8).setCellValue(detalle.getCantidad());

            double subtotal = detalle.getCantidad() * Double.parseDouble(detalle.getInstrumento().getPrecio());
            if (!"G".equals(costoEnvioStr)) {
                subtotal += costoEnvio;
            }
            row.createCell(9).setCellValue(subtotal);
        }

        // Combinar celdas de las columnas de ID, Fecha Pedido, Título y Total
        if (mergedRows > 1) {
            CellRangeAddress mergedCell = new CellRangeAddress(rowIndex, rowIndex + mergedRows - 1, 0, 0); // ID
            sheet.addMergedRegion(mergedCell);
            mergedCell = new CellRangeAddress(rowIndex, rowIndex + mergedRows - 1, 1, 1); // Fecha Pedido
            sheet.addMergedRegion(mergedCell);
            mergedCell = new CellRangeAddress(rowIndex, rowIndex + mergedRows - 1, 10, 10); // Total
            sheet.addMergedRegion(mergedCell);
        }
    }
//
//
//    /*Generar PDF*/
//
//    public static void addMetaData(Document document) {
//        document.addTitle("Detalle del Instrumento");
//        document.addSubject("Informe PDF del Instrumento");
//        document.addKeywords("Instrumento, Detalle, PDF");
//        document.addAuthor("Tu Nombre");
//        document.addCreator("Tu Nombre");
//    }
//
//    public static void addEmptyLine(Document document, int number) throws DocumentException {
//        for (int i = 0; i < number; i++) {
//            document.add(new Paragraph(" "));
//        }
//    }
//
//    public static void setLineaReporte(Document document) throws DocumentException {
//        PdfPTable linea = new PdfPTable(1);
//        linea.setWidthPercentage(100.0f);
//        PdfPCell cellOne = new PdfPCell(new Paragraph(""));
//        cellOne.setBorder(Rectangle.BOTTOM);
//        cellOne.setBorder(Rectangle.TOP);
//        linea.addCell(cellOne);
//
//        document.add(linea);
//    }
//
//    public static ByteArrayOutputStream generateInstrumentoPDF(Instrumento instrumento) throws DocumentException, MalformedURLException, IOException {
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        try {
//            Document document = new Document(PageSize.A4, 30, 30, 0, 30);
//            addMetaData(document);
//
//            PdfWriter.getInstance(document, outputStream);
//            document.open();
//
//            // Encabezado
//            PdfPTable tableCabecera = new PdfPTable(1);
//            tableCabecera.setWidthPercentage(100f);
//
//            PdfPCell cell = new PdfPCell(new Paragraph("Detalle del Instrumento", titulo));
//            cell.setBorder(Rectangle.NO_BORDER);
//            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//            tableCabecera.addCell(cell);
//
//            document.add(tableCabecera);
//
//            addEmptyLine(document, 1);
//            setLineaReporte(document);
//            // Fin encabezado
//
//            // Contenido del instrumento
//            ClassLoader classLoader = ReportGenerator.class.getClassLoader();
//            String imagePath = "img/" + instrumento.getImagen(); // Ruta relativa dentro de resources
//            InputStream imgStream = classLoader.getResourceAsStream(imagePath);
//            if (imgStream != null) {
//                Image imgInstrumento = Image.getInstance(IOUtils.toByteArray(imgStream));
//                imgInstrumento.scaleAbsolute(200f, 200f);
//                imgInstrumento.setAlignment(Element.ALIGN_CENTER);
//                document.add(imgInstrumento);
//            } else {
//                // Si la imagen no se encuentra, puedes agregar una imagen predeterminada o un mensaje de error
//                Paragraph errorParagraph = new Paragraph("Imagen no encontrada", texto);
//                errorParagraph.setAlignment(Element.ALIGN_CENTER);
//                document.add(errorParagraph);
//            }
//
//            addEmptyLine(document, 1);
//
//            Paragraph paragraph = new Paragraph(instrumento.getInstrumento(), titulo);
//            paragraph.setAlignment(Element.ALIGN_CENTER);
//            document.add(paragraph);
//
//            addEmptyLine(document, 1);
//
//            PdfPTable table = new PdfPTable(2);
//            table.setWidthPercentage(80);
//            table.setHorizontalAlignment(Element.ALIGN_CENTER);
//
//            table.addCell(new Phrase("Precio:", textoBold));
//            table.addCell(new Phrase("$" + instrumento.getPrecio(), texto));
//
//            table.addCell(new Phrase("Marca:", textoBold));
//            table.addCell(new Phrase(instrumento.getMarca(), texto));
//
//            table.addCell(new Phrase("Modelo:", textoBold));
//            table.addCell(new Phrase(instrumento.getModelo(), texto));
//
//            table.addCell(new Phrase("Descripción:", textoBold));
//            table.addCell(new Phrase(instrumento.getDescripcion(), texto));
//
//            table.addCell(new Phrase("Costo de envío:", textoBold));
//            if ("G".equals(instrumento.getCostoEnvio())) {
//                table.addCell(new Phrase("Envío gratis a todo el país", texto));
//            } else {
//                table.addCell(new Phrase("Costo de envío: $" + instrumento.getCostoEnvio(), texto));
//            }
//
//            table.addCell(new Phrase("Categoría:", textoBold));
//            table.addCell(new Phrase(instrumento.getCategoria().getDenominacion(), texto));
//
//            document.add(table);
//
//            document.close();
//        } catch (DocumentException | IOException e) {
//            e.printStackTrace();
//        }
//        return outputStream;
//    }


    public List<List<Object>> obtenerCantidadPedidosPorMeses(Integer anio) {
        List<Object[]> resultados = pedidoService.obtenerCantidadPedidos(anio);
        return resultados.stream()
                .map(r -> List.of(r[0], r[1]))
                .collect(Collectors.toList());
    }

    public List<List<Object>> obtenerCantidadPedidos() {
        List<Object[]> resultados = pedidoService.obtenerCantidadPedidos();
        return resultados.stream()
                .map(r -> List.of(r[0], r[1]))
                .collect(Collectors.toList());
    }

    public ByteArrayInputStream obtenerExcelPedidosPorRangoFechas(LocalDate desde, LocalDate hasta) {
        List<Pedido> pedidos = this.pedidoService.obtenerPedidosPorFecha(desde, hasta);
        try {
            return generateExcelReport(pedidos);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }

    }
}
