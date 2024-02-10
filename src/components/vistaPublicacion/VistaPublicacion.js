import { useParams, useLocation } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect } from 'react'
const GridPublicacion = lazy(() => import('./GridPublicacion'))

const VistaPublicacion = () => {
  const { propiedadId } = useParams()
  const { state } = useLocation()
  const [currentImage, setCurrentImage] = useState(0)
  const [numImagenes, setNumImagenes] = useState(state.cantImgs)
  const [imgLinks, setImgLinks] = useState(Array.from({ length: numImagenes }, (_, i) => `${process.env.PUBLIC_URL}/images/casas/${propiedadId}/${i + 1}.webp`))

  useEffect(() => {
    setNumImagenes(state.cantImgs)
    if (imgLinks.length > state.cantImgs) {
      setCurrentImage(0)
    }
    setImgLinks(Array.from({ length: numImagenes }, (_, i) => `${process.env.PUBLIC_URL}/images/casas/${propiedadId}/${i + 1}.webp`))
  }, [imgLinks, numImagenes, state.cantImgs, propiedadId])

  const handlePrev = () => {
    setCurrentImage(prev => (prev - 1 + imgLinks.length) % imgLinks.length)
  }

  const handleNext = () => {
    setCurrentImage(prev => (prev + 1) % imgLinks.length)
  }

  return (
    <section className='mt-20' id={propiedadId}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center text-center flex-col'>
          <span className={` badge badge-xl badge-error text-white ${state.isVendido ? 'inline-flex' : 'hidden'}`}>Vendido</span>
          <h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white pt-0.5 pr-5'>{state.propiedad}</h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <Suspense>
          <div className='carousel w-full md:p-32 md:pt-0 lg:p-48 lg:pt-0 lg:h-screen'>
            <GridPublicacion imgLink={imgLinks[currentImage]} title={currentImage + 1} idImage={currentImage + 1} handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        </Suspense>
      </div>
    </section>
  )
}

export default VistaPublicacion
