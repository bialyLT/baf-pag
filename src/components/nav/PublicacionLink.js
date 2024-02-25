import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const PublicacionLink = ({ p, i }) => {

  return (
    <li key={i}>
      <Link
        to={`/propiedades/propiedad-${i + 1}/`}
        state={{
          propiedad: capitalizeFirstLetter(p.title),
          id: i + 1,
          cantImgs: p.images.length,
          isVendido: p.isVendido,
          linkFacebook: p.linkFacebook
        }}
        key={i}>{capitalizeFirstLetter(p.title)}</Link>
    </li>
  );
};

export default PublicacionLink;
