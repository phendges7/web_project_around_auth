import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import ProtectedRoute from "./ProtectedRoute";

import { handleCardFormSubmit } from "../utils/handlers";

import Register from "./Register";
import Login from "../components/Login";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import InfoTooltip from "./InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import AppContext from "../contexts/AppContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // MANIPULADOR DE REGISTRO
  const onRegister = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((data) => {
        console.group("Debug de Registro");
        console.log("Dados completos:", data);
        console.groupEnd();

        setIsRegistrationSuccess(true);
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsRegistrationSuccess(false);
        console.error("Erro ao registrar o usuário: ", error);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  // MANIPULADOR DE LOGIN
  const onLogin = async ({ email, password }) => {
    try {
      const jwtToken = await auth.authorize(email, password); // Chama a função authorize com email e senha
      if (!jwtToken) throw new Error("Token não recebido"); // Verifica se o token foi recebido

      const userData = await auth.getUserInfo(jwtToken); // Chama a função getUserInfo com o token
      console.log("Dados do usuário:", userData); // Exibe os dados do usuário

      // 4. Debug
      console.group("Debug de Login");
      console.log("Token recebido:", jwtToken);
      console.log("Dados do usuário:", userData);
      console.groupEnd();

      setToken(jwtToken);
      setIsLoggedIn(true);
      setCurrentUser({
        email: userData.data.email,
        _id: userData.data._id,
      });

      navigate(location.state?.from || "/"); // 6. Navega para a rota de origem ou para a raiz
    } catch (error) {
      console.error("Erro ao fazer login: ", error); // 7. Exibe erro
      removeToken();
      setIsLoggedIn(false);
    }
  };

  //------------- RELOAD LOGIN - DADOS DO USUARIO -------------//
  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser({
            email: userData.data.email,
            id: userData.data._id,
          });
          setIsLoggedIn(true);
        })
        .catch(() => {
          removeToken();
        });
    }
  }, []);

  //------------- CARDS -------------//
  /*useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erro ao buscar os cartões:", err));
  }, []);*/

  //------------- RENDER -------------//
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CardContext.Provider
          value={{
            handleCardFormSubmit,
          }}
        >
          <div className="overlay"></div>
          <div className="page">
            <Header />
            <main className="content">
              <Routes>
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                {/* ROTAS PRIVADAS */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Main setIsLoggedIn={setIsLoggedIn} />
                    </ProtectedRoute>
                  }
                />
                {/* ROTAS PUBLICAS */}
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                      <div className="login">
                        <Login onLogin={onLogin} />
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                      <Register onRegister={onRegister} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={() => setIsInfoTooltipOpen(false)}
            isSuccess={isRegistrationSuccess}
          />
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
