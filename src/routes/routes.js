import {
  Route,
  Routes
} from 'react-router-dom'
import { lazy } from 'react'
const Main = lazy(() => import('../components/pages/MainPage'))
const Contacto = lazy(() => import('../components/pages/ContactoPage'))
const Home = lazy(() => import('../components/pages/HomePage'))
const VistaPublicacion = lazy(() => import('../components/pages/PublicacionPage'))
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
