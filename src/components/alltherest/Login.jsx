import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    username: "",
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
    handleLogin(data);
  };

  return (
    <div className="login">
      <p className="login__welcome">Entrar</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          id="username"
          required
          name="username"
          type="text"
          placeholder="E-mail"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          required
          name="password"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Entrar
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ainda não é membro?</p>
        <Link to="/register" className="signup__link">
          Inscreva-se aqui
        </Link>
      </div>
    </div>
  );
};

export default Login;
