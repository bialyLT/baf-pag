import './Footer.css'
import IconBaf from '../otros/IconBaf'
import ButtonLinkFb from '../otros/ButtonLinkFb'

const Footer = () => {
  return (
    <footer className='footer items-center justify-center md:justify-between justify-items-center p-4 bg-ghost text-light-content mt-10'>
      <aside className='items-center grid-flow-col mr-4'>
        <IconBaf />
        <p>BAF Bienes Raices</p>
      </aside>
      <ButtonLinkFb link='https://www.facebook.com/profile.php?id=100077386128848' title={'BAF en facebook'} />
      <p className='grid-flow-col md:grid-flow-row md:justify-items-center gap-2'>Diseñado y Desarrollado por<a className='link link-hover font-bold z-[5]' href='https://www.linkedin.com/in/liambialy/'>Liam Bialy</a>
      </p>
    </footer>
  )
}

export default Footer
