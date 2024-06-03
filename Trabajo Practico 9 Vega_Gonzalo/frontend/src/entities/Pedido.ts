import { PedidoDetalle } from "./PedidoDetalle";

export interface Pedido {
    id: number;
    fechaPedidoString : string;
    totalPedido: number;
    pedidoDetalles : PedidoDetalle[]
}