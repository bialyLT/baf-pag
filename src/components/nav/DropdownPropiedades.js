import { Link } from 'react-router-dom'
const DropdownPropiedades = ({ propiedades }) => {
  return (
    <ul tabIndex={0} className='menu menu-sm dropdown-content lg:menu-horizontal  z-[1] p-2 shadow bg-base-100 rounded-box w-100 flex-nowrap'>
      <li><Link to='/'>Inicio</Link></li>
      <li><Link to='/contacto'>Contacto</Link></li>
      <li>
        <details>
          <summary>Propiedades</summary>
          <ul className='p-2 lg:menu-sm overflow-auto overflow-x-hidden max-h-[500px]'>
            {propiedades.map((p, i) =>
              <li key={i}>
                <Link to={`/propiedades/propiedad-${i + 1}/`} state={{ propiedad: p.name, id: i + 1, cantImgs: p.cantImg, isVendido: p.vendido, linkFacebook: p.linkFacebook }} key={i}>{p.name}</Link>
              </li>)}
          </ul>
        </details>
      </li>
    </ul>
  )
}

export default DropdownPropiedades
