import { Suspense } from 'react'
import MySpinner from '../components/MySpinner'
import Slider from '../components/Slider'

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <Suspense fallback={<MySpinner></MySpinner>}>
      <Slider></Slider>
      </Suspense>
      <h2>Sobre Nosotros</h2>
      <p>Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
        experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
        mejores elecciones para tu compra musical</p>
    </>
  )
}

export default HomePage