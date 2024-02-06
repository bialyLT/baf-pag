import { Suspense, lazy } from 'react'
const Publicacion = lazy(() => import('./Publicacion'))

export default function Publicaciones ({ propiedades }) {
  return (
    <section className='text-center'>
      <h1 className='text-4xl font-bold my-5 drop-shadow-lg'>
        Propiedades en Venta
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-x-1 gap-y-5 justify-items-center lg:grid-cols-3'>
        <Suspense>
          {propiedades.map((p, i) => <Publicacion title={p.name} key={i} imgPortada={p.portada} />)}
        </Suspense>
      </div>
    </section>
  )
}
