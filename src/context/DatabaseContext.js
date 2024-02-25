import { createContext, useState, useEffect } from 'react'
import { loadPublicaciones } from '../helpers/publicacionHelpers.js'

export const DatabaseContext = createContext()

export const DatabaseProvider = props => {
  const [publicaciones, setPublicaciones] = useState([])

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const data = await loadPublicaciones()
      setPublicaciones(data)
    }
    fetchPublicaciones()
  }, [])
  return (
    <DatabaseContext.Provider value={{ publicaciones }}>
      {props.children}
    </DatabaseContext.Provider>
  )
}