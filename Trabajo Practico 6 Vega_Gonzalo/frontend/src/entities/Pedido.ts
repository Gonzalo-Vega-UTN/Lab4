import { PedidoDetalle } from "./PedidoDetalle";

export interface Pedido {
    id: number;
    fechaPedido : Date;
    totalPedido: number;
    pedidoDetalles : PedidoDetalle[]
}