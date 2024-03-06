import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration
} from 'react-router-dom'
import ErrorPage from './components/otros/ErrorPage.js'
import Loading from './components/otros/Loading.js'
import { PublicacionesProvider } from './context/Publicaciones.js'
import { AppRoutes } from './routes/routes.js'
import { Suspense } from 'react'
import { PublicationProvider } from './context/Publicacion.js'

const router = createBrowserRouter([
  { path: '/*', Component: Root, loader: Loading, errorElement: <ErrorPage /> }
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

function Root() {
  return (
    <>
      <ScrollRestoration />
      <AppRoutes />
    </>
  )
}

export default App
