import PublicacionInstrumento from "./components/PublicacionInstrumento"
import Instrumento from "./entities/Instrumento"
import './App.css'
import { getPlatosJSON } from './services/ApiInstrumentos'

function App() {

  const instrumentos: Instrumento[] = getPlatosJSON();
    
  return (
    <>
      
      <div className="instrumento-list">
      {instrumentos.map(instrumento => (
        <PublicacionInstrumento key={instrumento.id} instrumento={instrumento} />
      ))}
    </div>
    </>
  )
}

export default App
