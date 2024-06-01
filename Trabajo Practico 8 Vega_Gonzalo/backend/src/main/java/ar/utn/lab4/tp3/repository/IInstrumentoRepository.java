package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IInstrumentoRepository extends JpaRepository<Instrumento, Long> {

    List<Instrumento> findTop5ByOrderByCantidadVendidaDesc();
}
