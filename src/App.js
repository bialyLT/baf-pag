import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration
} from 'react-router-dom'
import ErrorPage from './components/otros/ErrorPage.js'
import Loading from './components/otros/Loading.js'
import { DatabaseProvider } from './context/DatabaseContext.js'
import { AppRoutes } from './routes/routes.js'
import { Suspense } from 'react'

const router = createBrowserRouter([
  { path: '/*', Component: Root, loader: Loading, errorElement: <ErrorPage /> }
])

const App = () => {
  return (
    <DatabaseProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </Suspense>
    </DatabaseProvider>
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
