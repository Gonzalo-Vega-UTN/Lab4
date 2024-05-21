import instrumentosData from '../instrumentos.json'; // Import JSON file
import type  Instrumento  from '../entities/Instrumento'; // Import interface

export function getPlatosJSON(): Instrumento[] {
  const { instrumentos } = instrumentosData; 
  return instrumentos as Instrumento[]; 
}
