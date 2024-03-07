import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL del backend
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setAuthToken = token => {
  if (token) {
    // Aplica el token de autenticación a cada solicitud si está logueado
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    // Elimina el encabezado de autenticación
    delete api.defaults.headers.common['Authorization'];
  }
}

export const getPublications = (orden) => {
  const ordenConcat = orden ? `?orden=${orden}` : ''
  return api.get(`/api/publicaciones${ordenConcat}`)
}
export const getPublication = (id) => api.get(`/api/publicaciones/${id}`)
export const createPublication = (publicacionData) => api.post('/admin/publicaciones', publicacionData)
export const updatePublication = (id, publicacionData) => api.put(`/admin/publicaciones/${id}`, publicacionData)
export const deletePublication = (id) => api.delete(`/admin/publicaciones/${id}`)
