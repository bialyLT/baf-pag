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
    if (imgLinks.length !== numImagenes) {
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
    <section className='mt-20 flex flex-col justify-content-center items-center' id={propiedadId}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center text-center flex-col'>
          <span className={` badge badge-xl badge-error text-white ${state.isVendido ? 'inline-flex' : 'hidden'}`}>Vendido</span>
          <h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white pt-0.5 pr-5'>{state.propiedad}</h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <Suspense>
          <div className='carousel w-full md:p-32 md:pt-0 lg:p-20 lg:pt-0 lg:h-screen'>
            <GridPublicacion imgLink={imgLinks[currentImage]} title={currentImage + 1} idImage={currentImage + 1} handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        </Suspense>
      </div>
      <a
        href={state.linkFacebook}
        target='_blank'
        rel='noreferrer'
        className='items-center flex justify-center px-4 py-2.5 mt-4 overflow-hidden text-sm text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80'
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-brand-facebook-filled' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z' strokeWidth='0' fill='currentColor' /></svg>
        <span className='mx-2'>
          Ver la publicacion en Facebook
        </span>
      </a>
    </section>
  )
}

export default VistaPublicacion
