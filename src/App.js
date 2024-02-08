import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom'
import Main from './components/main/Main.js'
import Contacto from './components/contacto/Contacto.js'
import Home from './components/main/Home.js'
import VistaPublicacion from './components/publicaciones/VistaPublicacion.js'
import ErrorPage from './components/ErrorPage.js'
import Loading from './components/Loading.js'

const router = createBrowserRouter([
  { path: '/*', Component: Root, loader: Loading, errorElement: <ErrorPage /> }
], { basename: '/baf-pag' })

const App = () => {
  return <RouterProvider router={router} />
}

function Root () {
  return (
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
}

export default App
