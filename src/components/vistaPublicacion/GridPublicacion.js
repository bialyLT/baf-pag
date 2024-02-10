const GridPublicacion = ({ imgLink, title }) => {
  return (
    <>
      <button className='btn indicator' onClick={() => document.getElementById(`imagen-${title}`).showModal()}>open modal</button>
      <img className='object-cover object-center w-auto h-auto rounded-lg' src={imgLink} alt={title} />
      <dialog id={`imagen-${title}`} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg text-center pb-5'>Vista Previa</h3>
          <img className='object-cover object-center w-full h-auto rounded-lg' src={imgLink} alt={title} />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default GridPublicacion
