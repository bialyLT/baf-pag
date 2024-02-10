import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../otros/Loading'
const Publicacion = lazy(() => import('./Publicacion'))

const Publicaciones = ({ propiedades }) => {
  return (
    <section className='text-center pt-32' id='propiedadesTitle'>
      <h1 className='text-4xl font-bold mb-16 drop-shadow-lg'>
        Propiedades en Venta
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-x-1 gap-y-5 justify-items-center lg:grid-cols-3'>
        {propiedades.map((p, i) =>
          <Link to={`/propiedades/propiedad-${i + 1}`} state={{ propiedad: p.name, id: i + 1, cantImgs: p.cantImg }} key={i}>
            <Suspense fallback={<Loading />}>
              <Publicacion title={p.name} imgPortada={p.portada} isVendido={p.vendido} />
            </Suspense>
          </Link>)}
      </div>
    </section>
  )
}

export default Publicaciones
