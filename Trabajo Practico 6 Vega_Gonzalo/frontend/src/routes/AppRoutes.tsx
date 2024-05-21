import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import DondeEstamosPage from '../pages/DondeEstamosPage'
import ListadoPublicacion from '../components/ListadoPublicacion'
import DetalleInstrumento from '../components/DetalleInstrumento'
import ErrorComp from '../components/Error'
import { GestionInstrumentos } from '../pages/GestionInstrumentos'
import FormInstrumento from '../components/FormInstrumento'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/donde-estamos' element={<DondeEstamosPage />}></Route>
      <Route path='/productos' element={<ListadoPublicacion />}></Route>
      <Route path='/detalle' >
        <Route path=":idInstrumento" element={<DetalleInstrumento />} />
      </Route>
      <Route path='/instrumento-form' >
        <Route path=":idInstrumento" element={<FormInstrumento />} />
      </Route>
      <Route path='/error' element={<ErrorComp></ErrorComp>}></Route>
      <Route path='/gestion' element={<GestionInstrumentos />}></Route>
      <Route path='*' element={<Home />}></Route>
    </Routes>
  )
}
