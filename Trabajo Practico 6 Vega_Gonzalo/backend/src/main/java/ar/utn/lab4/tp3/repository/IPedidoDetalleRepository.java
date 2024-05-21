package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPedidoDetalleRepository extends  JpaRepository<PedidoDetalle, Long> {
}
