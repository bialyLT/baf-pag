import { Link } from "react-router-dom";

const PublicacionLink = ({ to, children, idPub }) => {

  return (
    <Link
      to={to}
      state={{ idPub: idPub }}
    >{children}</Link>
  );
};

export default PublicacionLink;
