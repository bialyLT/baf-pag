import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
const Publicacion = lazy(() => import('./Publicacion'))

export default function Publicaciones ({ propiedades }) {
  return (
    <section className='text-center'>
      <h1 className='text-4xl font-bold my-5 drop-shadow-lg'>
        Propiedades en Venta
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-x-1 gap-y-5 justify-items-center lg:grid-cols-3'>
        <Suspense>{propiedades.map((p, i) =>
          <Link to={`/propiedades/propiedad-${i + 1}`} state={{ propiedad: p.name, id: i + 1, cantImgs: p.cantImg }} key={i} className='card w-80 bg-base-100 shadow-2xl image-full'>
            <Publicacion title={p.name} imgPortada={p.portada} />
          </Link>)}
        </Suspense>
      </div>
    </section>
  )
}
