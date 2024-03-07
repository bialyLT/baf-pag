import { createContext, useState } from 'react'
import { getAdminUserHelper } from '../helpers/adminHelper'

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState([])
  const [error, setError] = useState();


  const getAdminUser = (data) => {
    try {
      const tokenReceived = getAdminUserHelper(data)
      console.log(tokenReceived)
      if (tokenReceived) {
        setToken(tokenReceived.data.token)
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError('Error de autenticación')
      } else {
        setError('Ocurrió un error')
      }
    }
  }

  return (
    <TokenContext.Provider value={{ token, getAdminUser, error }}>
      {children}
    </TokenContext.Provider>
  )
}
