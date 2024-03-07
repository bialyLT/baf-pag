import { Link, useParams } from "react-router-dom";
import { PublicationContext } from "../../context/Publicacion";
import { useContext, useEffect } from "react";

const PublicacionLink = ({ to, children }) => {
  const { loadPublication } = useContext(PublicationContext)
  const { propiedadId } = useParams()
  useEffect(() => {
    loadPublication(propiedadId)
  }, [propiedadId])

  return (
    <Link to={to}>{children}</Link>
  )
}

export default PublicacionLink
