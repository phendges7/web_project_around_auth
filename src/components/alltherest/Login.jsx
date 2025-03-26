import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="login__container">
      <p className="login__welcome">Entrar</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          id="username"
          required
          name="email"
          type="text"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          required
          name="password"
          placeholder="Senha"
          value={data.password}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
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
