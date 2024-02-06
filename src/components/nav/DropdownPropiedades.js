export default function DropdownPropiedades ({ propiedades }) {
  return (
    <ul tabIndex={0} className='menu menu-sm dropdown-content lg:menu-horizontal  z-[1] p-2 shadow bg-base-100 rounded-box w-100 flex-nowrap'>
      <li><a href='#inicio'>Inicio</a></li>
      <li><a href='#contacto'>Contacto</a></li>
      <li>
        <details>
          <summary>Propiedades</summary>
          <ul className='p-2 lg:menu-sm overflow-auto overflow-x-hidden max-h-[500px]'>
            {propiedades.map((p, i) =>
              <li key={i}>
                <a href={`#propiedad-${i + 1}`}>{p.name}</a>
              </li>)}
          </ul>
        </details>
      </li>
    </ul>
  )
}
