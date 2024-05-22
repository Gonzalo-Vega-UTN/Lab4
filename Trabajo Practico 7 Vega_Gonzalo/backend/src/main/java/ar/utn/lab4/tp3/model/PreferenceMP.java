package ar.utn.lab4.tp3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class PreferenceMP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private int statusCode;
}
