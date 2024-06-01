import Instrumento from "./Instrumento";

export interface PedidoDetalle {
    id : string;
    cantidad : number;
    instrumento: Instrumento;
}