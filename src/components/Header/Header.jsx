import headerLogo from "../../images/headerLogo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />
      <p className="header__login">Entrar</p>
    </header>
  );
}

export default Header;
