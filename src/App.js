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

const router = createBrowserRouter([
  { path: '*', Component: Root, errorElement: <ErrorPage /> }
])

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
          <Route path='/*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
