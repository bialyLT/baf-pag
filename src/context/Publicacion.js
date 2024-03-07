import { createContext, useState } from 'react'
import { loadPublicationHelper } from '../helpers/publicacionsHelpers'

const PublicationContext = createContext()

const PublicationProvider = ({ children }) => {
  const [currentPublication, setCurrentPublication] = useState()

  const loadPublication = async (idParam) => {
    if (idParam) {
      const publication = await loadPublicationHelper(idParam)
      setCurrentPublication(publication.data.data)
    }
  }

  return (
    <PublicationContext.Provider value={{ currentPublication, loadPublication }}>
      {children}
    </PublicationContext.Provider>
  )
}

export { PublicationProvider, PublicationContext }
