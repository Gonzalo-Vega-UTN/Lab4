package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoriaRepository extends JpaRepository<CategoriaInstrumento, Long> {
}
