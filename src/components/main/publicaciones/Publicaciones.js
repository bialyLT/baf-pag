import { Suspense, lazy, useContext } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../otros/Loading'
import { DatabaseContext } from '../../../context/DatabaseContext'
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter'
const Publicacion = lazy(() => import('./Publicacion'))

const Publicaciones = () => {
  const publicaciones = useContext(DatabaseContext);
  return (
    <section className='text-center pt-32' id='propiedadesTitle'>
      <h1 className='text-4xl font-bold mb-16 drop-shadow-lg'>
        Propiedades en Venta
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-x-1 gap-y-5 justify-items-center lg:grid-cols-3'>
        {publicaciones.publicaciones.map((p, i) =>
          <Link to={`/propiedades/propiedad-${i + 1}/`} key={i}>
            <Suspense fallback={<Loading />}>
              <Publicacion title={capitalizeFirstLetter(p.title)} imgPortada={p.portada} isVendido={p.isVendido} />
            </Suspense>
          </Link>)}
      </div>
    </section>
  )
}

export default Publicaciones
