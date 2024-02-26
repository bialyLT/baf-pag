import { Link } from "react-router-dom";

const PublicacionLink = ({ to, children }) => {

  return (
    <Link to={to}>{children}</Link>
  );
};

export default PublicacionLink;
