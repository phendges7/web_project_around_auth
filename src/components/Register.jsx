import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ onRegister }) => {
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
    onRegister(data);
  };

  return (
    <div className="register__container">
      <p className="register__welcome">Inscrever-se</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Inscreva-se
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
