import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import DetalleInstrumento from '../components/DetalleInstrumento'
import ErrorComp from '../components/Error'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { RutaPrivada } from '../components/rutas/RutaPrivada'
import { Role } from '../entities/Role'
import RutaProtegida from '../components/rutas/RutaProtegida'
import SuccessMP from '../pages/SuccessMP'
import FailureMp from '../pages/FailureMp'
import { Reportes } from '../pages/Reportes'
const ListadoPublicacion = lazy(() => import('../components/ListadoPublicacion'));
const GestionInstrumentos = lazy(() => import('../pages/GestionInstrumentos'));
const FormInstrumento = lazy(() => import('../pages/FormInstrumento'));
const DondeEstamosPage = lazy(() => import('../pages/DondeEstamosPage'));

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

      <Route path='/gestion' element={
        <RutaProtegida role={Role.ADMIN}>
          <GestionInstrumentos />
        </RutaProtegida>}></Route>

      <Route path='/reportes' element={
        <RutaProtegida role={Role.ADMIN}>
          <Reportes />
        </RutaProtegida>}></Route>

      <Route path='/login' element={<Login />}></Route>
      <Route path='/registro' element={<Register />}></Route>
      <Route path='/mpsuccess' element={<SuccessMP />}></Route>
      <Route path='/mpfailure' element={<FailureMp />}></Route>

      <Route path='*' element={<Home />}></Route>

    </Routes >
  )
}
