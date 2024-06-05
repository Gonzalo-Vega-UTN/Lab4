import { PedidoDetalle } from "./PedidoDetalle";

export interface Pedido {
    id: number;
    fechaPedido : string;
    totalPedido: number;
    pedidoDetalles : PedidoDetalle[]
    userId: number
}