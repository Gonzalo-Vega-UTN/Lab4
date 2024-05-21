package ar.utn.lab4.tp3.dto;

import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstrumentoDto {

    Long id;
    String instrumento;
    String marca;
    String modelo;
    String imagen;
    String precio;
    String costoEnvio;
    Integer cantidadVendida;
    String descripcion;
    CategoriaInstrumento categoriaInstrumento;
}
