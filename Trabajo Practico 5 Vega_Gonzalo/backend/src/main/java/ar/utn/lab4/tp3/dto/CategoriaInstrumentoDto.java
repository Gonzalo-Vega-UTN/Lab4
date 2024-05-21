package ar.utn.lab4.tp3.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoriaInstrumentoDto {
    Long id;
    String denominacion;

}