import { useParams, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loading from '../otros/Loading'
const GridPublicacion = lazy(() => import('./GridPublicacion'))

const VistaPublicacion = () => {
  const { propiedadId } = useParams()
  const { state } = useLocation()
  const numImagenes = state.cantImgs
  const imgLinks = Array.from({ length: numImagenes }, (_, i) => `${process.env.PUBLIC_URL}/images/casas/${propiedadId}/${i + 1}.webp`)
  return (
    <section className='mt-32' id={propiedadId}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center justify-center lg:justify-start'>
          <h1 className='text-2xl font-semibold text-gray-800 lg lg:text-3xl dark:text-white'>{state.propiedad}</h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
          {imgLinks.map((imgLink, i) =>
            <div key={i}>
              <Suspense fallback={<Loading />}>
                <GridPublicacion imgLink={imgLink} title={i + 1} />
              </Suspense>
            </div>)}
        </div>
      </div>
    </section>
  )
}

export default VistaPublicacion
