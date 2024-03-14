import axios from "axios"

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL del backend
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json'
  }
})


export const getUserAdmin = async (dataUser) => {
  try {
    const res = await api.post('./admin-login', dataUser)
    return res.data
  } catch (e) {
    if (e.response && e.response.status === 401) {
      throw new Error('Usuario y/o contraseña incorrectos')
    } else {
      throw new Error('Ocurrio un error inesperado')
    }
  }
}