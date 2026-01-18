import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import "../styles/pages/NotFound.scss";

function NotFound() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <p>The page you are looking for doesn't exist or has been moved.</p>

      <Link to="/" className="notfound__link">
        <Button>Return Home</Button>
      </Link>
    </main>
  );
}

export default NotFound;