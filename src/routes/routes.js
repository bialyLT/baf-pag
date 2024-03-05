import {
  Route,
  Routes
} from 'react-router-dom'
import { lazy } from 'react'
import { PublicationProvider } from '../context/Publicacion'
const Main = lazy(() => import('../components/pages/MainPage'))
const Contacto = lazy(() => import('../components/pages/ContactoPage'))
const Home = lazy(() => import('../components/pages/HomePage'))
const PublicacionPage = lazy(() => import('../components/pages/PublicacionPage'))
export const AppRoutes = () => (
  <>
    <Routes>
      <Route element={<Main />}>
        <Route path='/' element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/propiedades/:propiedadId' element={
          <PublicationProvider>
            <PublicacionPage />
          </PublicationProvider>} />
      </Route>
    </Routes>
  </>
)
