import { createContext, useState } from 'react'
import { getPublication } from '../services/apiPublicacions'

const PublicationContext = createContext()

const PublicationProvider = ({ children }) => {
  const [currentPublication, setCurrentPublication] = useState(null)

  const loadPublication = async (idParam) => {
    const id = await getPublication(idParam)
    setCurrentPublication(id)
  }

  return (
    <PublicationContext.Provider value={{ currentPublication, loadPublication }}>
      {children}
    </PublicationContext.Provider>
  )
}

export { PublicationProvider, PublicationContext }