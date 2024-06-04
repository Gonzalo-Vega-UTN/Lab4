package ar.utn.lab4.tp3.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ar.utn.lab4.tp3.model.Instrumento;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PedidoDetalleResp {
    Long id;
    Integer cantidad;
    Instrumento instrumento;
}
