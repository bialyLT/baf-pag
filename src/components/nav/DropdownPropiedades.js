import { Link } from 'react-router-dom'
import { getPublications } from '../../services/apiPublicacions'
import { useEffect, useState } from 'react'
const DropdownPropiedades = ({ propiedades }) => {
  const [publicaciones, setPublicaciones] = useState([])

  useEffect(() => {
    loadPublicaciones()
  })

  const loadPublicaciones = () => {
    getPublications('titleAsc')
      .then(res => setPublicaciones(res.data.data))
      .catch(e => console.error('Error al cargar las publicaciones', e))
  }

  return (
    <ul tabIndex={0} className='menu menu-sm dropdown-content lg:menu-horizontal  z-[1] p-2 shadow bg-base-100 rounded-box w-100 flex-nowrap'>
      <li><Link to='/'>Inicio</Link></li>
      <li><Link to='/contacto'>Contacto</Link></li>
      <li>
        <details>
          <summary>Propiedades</summary>
          <ul className='p-2 lg:menu-sm overflow-auto overflow-x-hidden max-h-[500px]'>
            {publicaciones.map((p, i) =>
              <li key={i}>
                <Link to={`/propiedades/propiedad-${i + 1}/`} state={{ propiedad: p.title, id: i + 1, cantImgs: p.images.length, isVendido: p.isVendido, linkFacebook: p.linkFacebook }} key={i}>{p.title}</Link>
              </li>)}
          </ul>
        </details>
      </li>
    </ul>
  )
}

export default DropdownPropiedades
