import { lazy, Suspense } from 'react'
import Loading from '../otros/Loading'
import { Link } from 'react-router-dom'

const ImgHeader = lazy(() => import('./ImgHeader'))

const Header = () => {
  return (

    <header className='hero min-h-screen bg-base'>
      <div className='hero-content flex-col md:flex-row-reverse '>
        <div>
          <Suspense fallback={<Loading />}>
            <ImgHeader />
          </Suspense>
        </div>
        <div>
          <h1 className='text-5xl font-bold'>Bienvenido a BAF Bienes Raices!</h1>
          <p className='py-6'>Descubra el hogar de sus sueños con nosotros. Nuestra pasión es encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.</p>
          <Link to='/'>
            <button className='btn btn-ghost'>Ver Propiedades</button>
          </Link>
        </div>
      </div>
    </header>

  )
}

export default Header
