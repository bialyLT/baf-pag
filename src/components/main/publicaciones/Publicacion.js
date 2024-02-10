const Publicacion = ({ title, imgPortada, isVendido }) => {
  return (
    <div className='card w-80 bg-base-100 shadow-2xl image-full hover:opacity-80 indicator h-full'>
      <figure><img src={imgPortada} alt={title} /></figure>
      <div className='card-body justify-between'>
        <span class={`indicator-item badge badge-error badge-lg ${isVendido ? 'inline-flex' : 'hidden'}`}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-home-dollar text-white' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M19 10l-7 -7l-9 9h2v7a2 2 0 0 0 2 2h6' /><path d='M9 21v-6a2 2 0 0 1 2 -2h2c.387 0 .748 .11 1.054 .3' /><path d='M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5' /><path d='M19 21v1m0 -8v1' /></svg>
        </span>
        <h2 className='card-title flex-col p-0.5'>{title}</h2>
        <div className='card-actions justify-end'>
          <button className='btn btn-ghost py-0 justify-content-end'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Publicacion
