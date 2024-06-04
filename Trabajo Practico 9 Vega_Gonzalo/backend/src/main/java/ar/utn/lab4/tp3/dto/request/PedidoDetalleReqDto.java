package ar.utn.lab4.tp3.dto.request;

import ar.utn.lab4.tp3.dto.InstrumentoDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PedidoDetalleReqDto {
    Integer id;
    Integer cantidad;
    Long instrumentoId;

}
