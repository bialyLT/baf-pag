const GridPublicacion = ({ imgLink, title, idImage, handlePrev, handleNext }) => {
  return (
    <>
      <div id={idImage} className='carousel-item relative w-full justify-center'>
        <img className='object-cover object-center w-auto h-full rounded-lg' src={imgLink} alt={`imagen-${title}`} />
        <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
          <button onClick={handlePrev} className='btn btn-circle'>❮</button>
          <button onClick={handleNext} className='btn btn-circle'>❯</button>
        </div>
      </div>
    </>
  )
}

export default GridPublicacion
