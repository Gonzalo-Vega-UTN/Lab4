package ar.utn.lab4.tp3.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "categoria_instrumento")
    CategoriaInstrumento categoriaInstrumento;

    
}
