import Instrumento from "./Instrumento";

export interface PedidoDetalle {
    id : number;
    cantidad : number;
    instrumento: Instrumento;
}