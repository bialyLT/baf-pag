import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  ScrollRestoration
} from 'react-router-dom'
import Main from './components/main/Main.js'
import Contacto from './components/contacto/Contacto.js'
import Home from './components/main/Home.js'
import VistaPublicacion from './components/vistaPublicacion/VistaPublicacion.js'
import ErrorPage from './components/otros/ErrorPage.js'
import Loading from './components/otros/Loading.js'

const router = createBrowserRouter([
  { path: '/*', Component: Root, loader: Loading, errorElement: <ErrorPage /> }
])

const App = () => {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}

function Root () {
  return (
    <>
      <ScrollRestoration />
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
