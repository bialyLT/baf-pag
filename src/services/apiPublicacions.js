import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL del backend
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getPublications = (orden) => api.get(`/publicaciones?orden=${orden}`)
export const createPublication = (publicacionData) => api.post('/publicaciones', publicacionData)
export const updatePublication = (id, publicacionData) => api.put(`/publicaciones/${id}`, publicacionData)
export const deletePublication = (id) => api.delete(`/publicaciones/${id}`)
