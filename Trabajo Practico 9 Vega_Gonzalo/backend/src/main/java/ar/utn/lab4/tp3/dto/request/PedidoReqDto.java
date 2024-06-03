package ar.utn.lab4.tp3.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PedidoReqDto {
    Long id;
    String fechaPedidoString;
    Double totalPedido;
    Set<PedidoDetalleReqDto> pedidoDetalles = new HashSet<>();
}
