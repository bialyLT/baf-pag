import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer items-center justify-center md:justify-between justify-items-center p-4 bg-ghost text-light-content mt-10'>
      <aside className='items-center grid-flow-col'>
        <img className='h-10 w-10 rounded' src='./images/favicon.ico' alt='BAF Bienes Raices' />
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <p className='grid-flow-col gap-2'>Diseñado y Desarrollado por<a className='link link-hover font-bold z-[5]' href='https://www.linkedin.com/in/liambialy/'>Liam Bialy</a>
      </p>
    </footer>
  )
}

export default Footer
