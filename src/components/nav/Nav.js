import ThemeController from './ThemeController'
import DropdownPropiedades from './DropdownPropiedades'
import { Link } from 'react-router-dom'
import IconBaf from '../otros/IconBaf'

const Nav = () => {
  return (
    <div className='navbar fixed z-[1000] bg-base-100 shadow-lg'>
      <div className='navbar-start'>
        <details className='dropdown lg:hidden'>
          <summary tabIndex={0} role='button' className='btn btn-ghost'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /></svg>
          </summary>
          <DropdownPropiedades />
        </details>
        <Link className='btn btn-ghost text-xl' to='/'>
          <IconBaf />
          <p className='hidden md:block'>BAF Bienes Raices</p>
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <DropdownPropiedades />
      </div>
      <div className='navbar-end'>
        <ThemeController />
      </div>
    </div>
  )
}

export default Nav
