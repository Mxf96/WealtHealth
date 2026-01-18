import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../styles/components/Header.scss";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <img src={logo} alt="WealthHealth logo" />
        </div>

        <nav className="header__nav">
          {path === "/" && <Link to="/employee-list">Employee List</Link>}

          {path === "/employee-list" && <Link to="/">Home</Link>}
        </nav>
      </div>
    </header>
  );
}

export default Header;