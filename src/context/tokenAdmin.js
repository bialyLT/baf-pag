import { createContext, useState } from 'react'
import { getAdminUserHelper } from '../helpers/adminHelper'
import { setAuthToken } from '../services/apiPublicacions'

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const [error, setError] = useState()
  const [validate, setValidate] = useState(false);

  const getAdminUser = (data) => {
    getAdminUserHelper(data)
      .then(res => {
        setAuthToken(res.token)
        setValidate(true)
      })
      .catch(e => {
        setError(e.message)
        setValidate(false)
      })
  }

  return (
    <TokenContext.Provider value={{ getAdminUser, error, setError, validate }}>
      {children}
    </TokenContext.Provider>
  )
}
