import { useParams } from 'react-router-dom'
import { Suspense, lazy, useState, useContext } from 'react'
import { DatabaseContext } from '../../context/DatabaseContext'
import { getNumberId } from '../../utils/getNumberId'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import ButtonLinkFb from '../otros/ButtonLinkFb'
const GridPublicacion = lazy(() => import('../vistaPublicacion/ImagePublicacionVista'))

const VistaPublicacion = () => {
  // la idea de propiedadid es ordenar las propiedades del 1 a n dependiendo del orden de busqueda en la bd
  const { propiedadId } = useParams()

  const { publicaciones } = useContext(DatabaseContext);
  const [currentImage, setCurrentImage] = useState(0)
  const publicacion = publicaciones[getNumberId(propiedadId) - 1]

  const handlePrev = () => {
    setCurrentImage(prev => (prev - 1 + publicacion.images.length) % publicacion.images.length)
  }

  const handleNext = () => {
    setCurrentImage(prev => (prev + 1) % publicacion.images.length)
  }

  return (
    <section className='mt-20 flex flex-col justify-content-center items-center' id={propiedadId}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center text-center flex-col'>
          <span className={` badge badge-xl badge-error text-white ${publicacion.isVendido ? 'inline-flex' : 'hidden'}`}>Vendido</span>
          <h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white pt-0.5 pr-5'>{capitalizeFirstLetter(publicacion.title)}</h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <Suspense>
          <div className='carousel w-full md:p-32 md:pt-0 lg:p-20 lg:pt-0 lg:h-screen'>
            <GridPublicacion imgLink={publicacion.images[currentImage]} title={publicacion.title} idImage={currentImage + 1} handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        </Suspense>
      </div>
      <ButtonLinkFb link={publicacion.linkFacebook} title='Ver publicacion en Facebook' />
    </section>
  )
}

export default VistaPublicacion
