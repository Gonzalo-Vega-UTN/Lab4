package ar.utn.lab4.tp3.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ar.utn.lab4.tp3.util.LocalDateSerializer;
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
public class PedidoResp {
    Long id;
    @JsonSerialize(using = LocalDateSerializer.class)
    LocalDate fechaPedido;
    Double totalPedido;
    Long userId;
    @Builder.Default
    List<PedidoDetalleResp> pedidoDetalles = new ArrayList<>();
}
