package ar.utn.lab4.tp3.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity

public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fullName;
    String password;
    String email;
    
    @OneToMany(mappedBy = "user")
    @Builder.Default
    Set<Pedido> pedidos = new HashSet<>();
    @Enumerated(EnumType.STRING)
    Role role;
}
