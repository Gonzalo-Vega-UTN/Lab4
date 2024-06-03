package ar.utn.lab4.tp3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class PedidoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer cantidad;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    @JsonIgnore
    Pedido pedido;

    @ManyToOne( cascade = CascadeType.ALL)
    Instrumento instrumento;
}
