import { getPublications } from '../services/apiPublicacions'

// cargar todas las publicaciones
export const loadPublicaciones = (orden) => {
  return getPublications(orden)
    .then(res => { return res.data.data })
    .catch(e => console.error('Error al cargar las publicaciones', e))
}
