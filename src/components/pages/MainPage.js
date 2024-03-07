import Nav from '../nav/Nav.js'
import { Outlet, useParams } from 'react-router-dom'
import Footer from '../footer/Footer.js'
import { useContext, useEffect } from 'react'
import { PublicationContext } from '../../context/Publicacion.js'

const Main = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Nav />
      <main className='mb-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default Main
