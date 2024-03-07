import { Suspense, lazy, useState, useContext } from 'react'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import ButtonLinkFb from '../otros/ButtonLinkFb'
const GridPublicacion = lazy(() => import('../vistaPublicacion/ImagePublicacionVista'))
import { PublicationContext } from '../../context/Publicacion'


const PublicacionPage = () => {
  let { currentPublication } = useContext(PublicationContext);
  const [currentImage, setCurrentImage] = useState(0)
  console.log(currentPublication)
  const handlePrev = () => {
    setCurrentImage(prev => (prev - 1 + currentPublication.images.length) % currentPublication.images.length)
  }

  const handleNext = () => {
    setCurrentImage(prev => (prev + 1) % currentPublication.images.length)
  }

  return (
    <section className='mt-20 flex flex-col justify-content-center items-center' id={currentPublication._id}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center text-center flex-col'>
          <span className={` badge badge-xl badge-error text-white ${currentPublication.isVendido ? 'inline-flex' : 'hidden'}`}>Vendido</span>
          <h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white pt-0.5 pr-5'>{capitalizeFirstLetter(currentPublication.title)}</h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <Suspense>
          <div className='carousel w-full md:p-32 md:pt-0 lg:p-20 lg:pt-0 lg:h-screen'>
            <GridPublicacion imgLink={currentPublication.images[currentImage]} title={currentPublication.title} idImage={currentImage + 1} handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        </Suspense>
      </div>
      <ButtonLinkFb link={currentPublication.linkFacebook} title='Ver publicacion en Facebook' />
    </section>
  )
}

export default PublicacionPage
