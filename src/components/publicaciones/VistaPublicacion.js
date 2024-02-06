import { useParams, useLocation } from 'react-router-dom'

const VistaPublicacion = () => {
  const { propiedadId } = useParams()
  const { state } = useLocation()

  return (
    <section className='mt-32' id={propiedadId}>
      <div className='container px-6 py-10 mx-auto'>
        <div className='flex items-center justify-center lg:justify-start'>
          <h1 className='text-2xl font-semibold text-gray-800 lg lg:text-3xl dark:text-white'>{state.propiedad} </h1>
        </div>
        <hr className='my-8 border-gray-400 dark:border-gray-700' />
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
          <div>
            <img className='object-cover object-center w-full h-64 rounded-lg lg:h-80' src='https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' alt='' />
          </div>
          <div>
            <img className='object-cover object-center w-full h-64 rounded-lg lg:h-80' src='https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' alt='' />
          </div>
          <div>
            <img className='object-cover object-center w-full h-64 rounded-lg lg:h-80' src='https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' alt='' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default VistaPublicacion
