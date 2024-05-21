package ar.vega.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity(name = "PAIS")
@Table(name = "PAIS")
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Pais {

    @Id
    @Column(name = "codigo_pais")
    Integer codigoPais;
    @Column(name = "nombre_pais")
    String nombrePais;
    @Column(name = "capital_pais")
    String capitalPais;
    @Column(name = "region")
    String region;
    @Column(name = "poblacion")
    Long poblacion;
    @Column(name = "latitud")
    Double latitud;
    @Column(name = "longitud")
    Double longitud;

    public Pais(Integer codigoPais, String nombrePais, String capitalPais, String region, Long poblacion, Double latitud, Double longitud) {
        this.codigoPais = codigoPais;
        this.nombrePais = nombrePais;
        this.capitalPais = capitalPais;
        this.region = region;
        this.poblacion = poblacion;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}
