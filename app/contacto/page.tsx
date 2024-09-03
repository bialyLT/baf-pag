import { NavMobile } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { getAllPropiedades } from "@/lib/propiedades";

export default async function Contacto() {
    const propiedades = await getAllPropiedades();

    return (
        <>
        <NavMobile propiedades={propiedades}/>
        <Navbar propiedades={propiedades}/>
      <section>
        <div className='container px-6 py-12 mx-auto'>
          <div className='text-center mt-32'>
            <p className='font-medium text-blue-500 dark:text-blue-400'>Contáctanos</p>
  
            <h1 className='mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>Ponte en Contacto con nosotros</h1>
  
            <p className='mt-3 text-gray-500 dark:text-gray-400'>Despeja tus dudas sobre alguna propiedad con nuestro amable equipo.</p>
          </div>
  
          <div className='grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col items-center justify-start text-center'>
              <span className='p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' />
                </svg>
              </span>
  
              <h2 className='mt-4 text-lg font-medium text-gray-800 dark:text-white'>Correo Electrónico</h2>
              <p className='mt-2 text-gray-500 dark:text-gray-400'>Nuestro equipo esta aqui para ayudarte.</p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'>liambialy2@gmail.com</p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'>zullybialy@gmail.com</p>
            </div>
  
            <div className='flex flex-col items-center justify-start text-center'>
              <span className='p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                </svg>
              </span>
  
              <h2 className='mt-4 text-lg font-medium text-gray-800 dark:text-white'>Oficina</h2>
              <p className='mt-2 text-gray-500 dark:text-gray-400'>Tengamos una reunion en persona.</p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'><a href='https://maps.app.goo.gl/3Fvn118AY8d7JfUd6' className='link link-ghost link-hover'>Santa Fé 1793 Posadas, Misiones</a></p>
            </div>
  
            <div className='flex flex-col items-center justify-start text-center'>
              <span className='p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z' />
                </svg>
  
              </span>
  
              <h2 className='mt-4 text-lg font-medium text-gray-800 dark:text-white'>Mensaje</h2>
              <p className='mt-2 text-gray-500 dark:text-gray-400'>Lunes a Viernes de 8hs hasta las 19hs.</p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'><a href='https://wa.me/5493764635099?text=Hola' className='link link-ghost link-hover'>+54 9 376 4635099</a></p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'><a href='https://wa.me/5493764736450?text=Hola' className='link link-ghost link-hover'>+54 9 376 4736450</a></p>
              <p className='mt-2 text-blue-500 dark:text-blue-400'><a href='https://wa.me/5493764657098?text=Hola' className='link link-ghost link-hover'>+54 9 376 4657098</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
    )
  }