import headerLogo from "../../images/headerLogo.svg";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getAuthButton = () => {
    if (isLoggedIn) {
      return {
        text: "Sair",
        action: handleLogout,
      };
    }
    if (location.pathname === "/register") {
      return {
        text: "Fazer Login",
        action: () => navigate("/login"),
      };
    }

    return {
      text: "Entrar",
      action: () => navigate("/login"),
    };
  };

  const authButton = getAuthButton();

  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />
      <button onClick={authButton.action} className="header__auth-button">
        {authButton.text}
      </button>
    </header>
  );
}

export default Header;
