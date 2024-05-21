package ar.utn.lab4.tp3.dto;

import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstrumentoDto {
    @Id
    Long id;
    String instrumento;
    String marca;
    String modelo;
    String imagen;
    String precio;
    String costoEnvio;
    Integer cantidadVendida;
    String descripcion;
}
