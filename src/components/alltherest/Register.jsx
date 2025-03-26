import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../images/headerLogo.svg";
import "../../blocks/Register.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <Logo title={"Around the U.S."} />
      <p className="register__welcome">Por favor, registre-se</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Inscreva-se aqui
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Já é um membro?</p>
        <Link to="login" className="register__login-link">
          Faça o login
        </Link>
      </div>
    </div>
  );
};

export default Register;
