import './App.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'
import Loading from './components/otros/Loading.js'
import { PublicacionesProvider } from './context/Publicaciones.js'
import { PublicationProvider } from './context/Publicacion.js'
import { TokenProvider } from './context/tokenAdmin.js'
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
        <TokenProvider>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} fallbackElement={<Loading />} />
          </Suspense>
        </TokenProvider>
      </PublicationProvider>
    </PublicacionesProvider>
  )
}

export default App
