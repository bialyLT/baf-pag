const GridPublicacion = ({ imgLink, title }) => {
  return (
    <img className='object-cover object-center w-full h-64 rounded-lg lg:h-80' src={imgLink} alt={title} />
  )
}

export default GridPublicacion
