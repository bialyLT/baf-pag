import { Suspense, lazy, useContext } from 'react'
import Loading from '../otros/Loading'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import PublicacionLink from '../otros/PublicacionLink'
import { PublicacionesContext } from '../../context/Publicaciones'
import { idModified } from '../../utils/idModified'
const PublicacionMainItem = lazy(() => import('./PublicacionMainItem'))

const PublicacionMainList = () => {
  const { publicaciones } = useContext(PublicacionesContext)
  const publics = publicaciones.data.data
  return (
    <section className='text-center pt-32' id='propiedadesTitle'>
      <h1 className='text-4xl font-bold mb-16 drop-shadow-lg'>
        Propiedades en Venta
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-x-1 gap-y-5 justify-items-center lg:grid-cols-3'>
        {publics.map((p, i) =>
          <PublicacionLink to={`/propiedades/${p.title}/`} key={p._id}>
            <Suspense fallback={<Loading />}>
              <PublicacionMainItem title={capitalizeFirstLetter(p.title)} imgPortada={p.portada} isVendido={p.isVendido} />
            </Suspense>
          </PublicacionLink>
        )}
      </div>
    </section>
  )
}

export default PublicacionMainList
