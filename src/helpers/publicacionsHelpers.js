import { getPublications, getPublication } from '../services/apiPublicacions'
// obtener todas las publicaciones
export const loadPublicaciones = (orden) => {
  try {
    const publications = getPublications(orden)
    return publications
  } catch (e) {
    console.error('Error al cargar las publicaciones: ', e)
  }
}

// obtener una publicacion

export const loadPublicationHelper = (id) => {
  try {
    if (id) {
      const publication = getPublication(id)
      return publication
    }
  } catch (e) {
    console.error('Error al cargar la publicacion: ', e);
  }
}

