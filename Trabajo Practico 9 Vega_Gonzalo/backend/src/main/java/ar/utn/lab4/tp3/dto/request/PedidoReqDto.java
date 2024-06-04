package ar.utn.lab4.tp3.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ar.utn.lab4.tp3.model.MyUser;
import ar.utn.lab4.tp3.util.LocalDateDeserializer;
import ar.utn.lab4.tp3.util.LocalDateSerializer;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PedidoReqDto {
    Long id;
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    LocalDate fechaPedido;
    Double totalPedido;
    @Builder.Default
    Set<PedidoDetalleReqDto> pedidoDetalles = new HashSet<>();
    @JsonBackReference
    Long userId;
}
