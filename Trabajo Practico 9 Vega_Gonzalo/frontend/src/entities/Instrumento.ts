import CategoriaInstrumento from "./CategoriaInstrumento";

export default interface Instrumento {
    id: string;
    alta : boolean
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
    categoriaInstrumento : CategoriaInstrumento
  }
  