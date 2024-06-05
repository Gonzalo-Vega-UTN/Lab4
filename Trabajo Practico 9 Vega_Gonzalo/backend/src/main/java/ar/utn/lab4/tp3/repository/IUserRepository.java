package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<MyUser, Long> {

    Optional<MyUser> findByEmail(String email);

    boolean existsByEmail(String email);
}
