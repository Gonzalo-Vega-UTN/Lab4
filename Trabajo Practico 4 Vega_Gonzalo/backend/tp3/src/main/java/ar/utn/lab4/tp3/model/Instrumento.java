package ar.utn.lab4.tp3.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Instrumento {
    @Id
    Long id;
    String instrumento;
    String marca;
    String modelo;
    String imagen;
    String precio;
    @Column(name = "costo_envio")
    String costoEnvio;
    @Column(name = "cantidad_vendida")
    Integer cantidadVendida;
    @Column(length = 500)
    String descripcion;
}
