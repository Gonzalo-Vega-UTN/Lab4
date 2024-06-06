package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IPedidoRepository extends JpaRepository<Pedido, Long> {

    @Query(nativeQuery = true, value = "SELECT  \n" +
            "       EXTRACT(MONTH FROM FECHA_PEDIDO) AS MES,\n" +
            "       SUM(CANTIDAD) AS CANTIDAD_INSTRUMENTOS_VENDIDOS\n" +
            "FROM PUBLIC.PEDIDO\n" +
            "JOIN PUBLIC.PEDIDO_DETALLE ON PUBLIC.PEDIDO.ID = PUBLIC.PEDIDO_DETALLE.PEDIDO_ID\n" +
            "WHERE EXTRACT(YEAR FROM FECHA_PEDIDO)  = ?\n" +
            "GROUP BY  MES\n" +
            "ORDER BY  MES;")
    List<Object[]> findCantidadInstrumentosVendidosPerOneYear(Integer anio);


    @Query(nativeQuery = true, value = "SELECT EXTRACT(YEAR FROM FECHA_PEDIDO) AS ANIO,\n" +
            "SUM(CANTIDAD) AS CANTIDAD_INSTRUMENTOS_VENDIDOS\n" +
            "FROM PUBLIC.PEDIDO\n" +
            "JOIN PUBLIC.PEDIDO_DETALLE ON PUBLIC.PEDIDO.ID = PUBLIC.PEDIDO_DETALLE.PEDIDO_ID\n" +
            "GROUP BY ANIO\n" +
            "ORDER BY ANIO;")
    List<Object[]> findCantidadInstrumentosVendidos();

    @Query("SELECT p FROM Pedido p WHERE p.fechaPedido BETWEEN :fechaDesde AND :fechaHasta")
    List<Pedido> findPedidosConDetallesByFechaRange(@Param("fechaDesde") LocalDate fechaDesde, @Param("fechaHasta") LocalDate fechaHasta);

    @Query("SELECT i.instrumento AS instrumento,\n" +
            "       SUM(pd.cantidad) AS cantidad\n" +
            "FROM Pedido p\n" +
            "JOIN p.pedidoDetalles pd\n" +
            "JOIN pd.instrumento i\n" +
            "GROUP BY i.instrumento\n")
    List<Object[]> findCantidadPedidosGroupedByInstrumentos();

}
