package ar.utn.lab4.tp3.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PedidoReqDto {
    Integer id;
    LocalDate fechaPedido;

    Double totalPedido;
    Set<PedidoDetalleReqDto> pedidoDetalles;
}
