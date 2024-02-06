import bgImageHeader from '../../assets/baf-header.webp'

function ImgHeader () {
  return (
    <img src={bgImageHeader} className='max-w-sm rounded-lg shadow-2xl hidden md:block' alt='header-img' />
  )
}

export default ImgHeader
