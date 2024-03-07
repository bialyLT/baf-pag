import './App.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'
import Loading from './components/otros/Loading.js'
import { PublicacionesProvider } from './context/Publicaciones.js'
import { PublicationProvider } from './context/Publicacion.js'
import { AppRoutes } from './routes/routes.js'
import { Suspense } from 'react'

const router = createBrowserRouter([
  ...AppRoutes,
  {
    path: '/*',
    element: <Navigate to="/" />
  }
])

const App = () => {
  return (
    <PublicacionesProvider>
      <PublicationProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </Suspense>
      </PublicationProvider>
    </PublicacionesProvider>
  )
}

export default App
