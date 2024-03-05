import { createContext, useState, useEffect } from 'react'
import { loadPublicaciones } from '../helpers/publicacionsHelpers.js'

export const PublicacionesContext = createContext()

export const PublicacionesProvider = props => {
  const [publicaciones, setPublicaciones] = useState([])

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const data = await loadPublicaciones()
      setPublicaciones(data)
    }
    fetchPublicaciones()
  }, [])
  return (
    <PublicacionesContext.Provider value={{ publicaciones }}>
      {props.children}
    </PublicacionesContext.Provider>
  )
}