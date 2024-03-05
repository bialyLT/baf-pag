import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL del backend
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getPublications = (orden) => {
  const ordenConcat = orden ? `?orden=${orden}` : ''
  return api.get(`/api/publicaciones${ordenConcat}`)
}
export const getPublication = (id) => api(`/api/publicaciones/${id}`)
export const createPublication = (publicacionData) => api.post('/api/publicaciones', publicacionData)
export const updatePublication = (id, publicacionData) => api.put(`/api/publicaciones/${id}`, publicacionData)
export const deletePublication = (id) => api.delete(`/api/publicaciones/${id}`)
