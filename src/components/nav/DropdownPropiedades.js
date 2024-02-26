import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DatabaseContext } from '../../context/DatabaseContext'
import PublicacionLink from '../otros/PublicacionLink'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
const DropdownPropiedades = () => {
  const { publicaciones } = useContext(DatabaseContext)

  return (
    <ul tabIndex={0} className='menu menu-sm dropdown-content lg:menu-horizontal  z-[1] p-2 shadow bg-base-100 rounded-box w-100 flex-nowrap'>
      <li><Link to='/'>Inicio</Link></li>
      <li><Link to='/contacto'>Contacto</Link></li>
      <li>
        <details>
          <summary>Propiedades</summary>
          <ul className='p-2 lg:menu-sm overflow-auto overflow-x-hidden max-h-[500px]'>
            {publicaciones.map((p, i) =>
              <li key={p._id}>
                <PublicacionLink to={`/propiedades/propiedad-${i + 1}/`}>
                  {capitalizeFirstLetter(p.title)}
                </PublicacionLink>
              </li>
            )}
          </ul>
        </details>
      </li>
    </ul>
  )
}

export default DropdownPropiedades
