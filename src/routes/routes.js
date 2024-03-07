import { lazy } from 'react'
import ErrorPage from '../components/otros/ErrorPage'
import AdminLoginPage from '../components/pages/AdminLoginPage'
const Main = lazy(() => import('../components/pages/MainPage'))
const Contacto = lazy(() => import('../components/pages/ContactoPage'))
const Home = lazy(() => import('../components/pages/HomePage'))
const PublicacionPage = lazy(() => import('../components/pages/PublicacionPage'))

export const AppRoutes = [
  {
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/contacto',
        element: <Contacto />
      },
      {
        path: '/propiedades/:propiedadId',
        element: <PublicacionPage />
      },
      {
        path: '/admin',
        element: <AdminLoginPage />
      }
    ]
  }
];
