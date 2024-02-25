import {
  Route,
  Routes
} from 'react-router-dom'
import { lazy } from 'react'
const Main = lazy(() => import('../components/main/Main'))
const Contacto = lazy(() => import('../components/contacto/Contacto'))
const Home = lazy(() => import('../components/main/Home'))
const VistaPublicacion = lazy(() => import('../components/vistaPublicacion/VistaPublicacion'))
export const AppRoutes = () => (
  <>
    <Routes>
      <Route element={<Main />}>
        <Route path='/' element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/propiedades/:propiedadId' element={<VistaPublicacion />} />
      </Route>
    </Routes>
  </>
)
