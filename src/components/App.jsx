import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import * as auth from "../utils/auth";
import * as api from "../utils/api";
import { getUserInfo } from "../utils/api";
import { setToken, getToken } from "../utils/token";
import ProtectedRoute from "./alltherest/ProtectedRoute";

import {
  handleCardFormSubmit,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
} from "../utils/handlers";

import Register from "./alltherest/Register";
import Login from "../components/alltherest/Login";
//import Main from "./alltherest/Main";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import AppContext from "../contexts/AppContext";

function App() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((data) => {
        console.group("Debug de Registro");
        console.log("Token:", data.token);
        console.log("Dados completos:", data);
        console.groupEnd();

        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao registrar o usuário: ", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password) // 1. Remove a desestruturação aqui
      .then((token) => {
        // 2. Recebe diretamente o token
        console.group("Debug de Login");
        console.log("Token recebido:", token);
        setToken(token);
        setIsLoggedIn(true);

        // 3. Adiciona chamada para obter dados do usuário
        api
          .getUserInfo(token) // Supondo que existe esta função na sua API
          .then((userData) => {
            console.log("Dados do usuário:", userData);
            setUserData(userData); // 5. Seta os dados reais do usuário
            navigate(location.state?.from || "/main");
          })
          .catch((userError) => {
            console.error("Erro ao obter dados do usuário:", userError);
          });
        console.groupEnd();
      })
      .catch((error) => {
        console.error("Erro ao fazer login: ", error);
      });
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then((data) => {
        setUserData(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário: ", error);
      });
  }, []);

  //------------- CARDS -------------//
  //carregar dados dos cards
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erro ao buscar os cartões:", err));
  }, []);

  //------------- PROFILE -------------//
  //carregar dados do usuário
  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  //------------- RENDER -------------//
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider
        value={(userData, handleProfileFormSubmit, handleAvatarFormSubmit)}
      >
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
                      <Navigate to="/main" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                {/* ROTAS PRIVADAS */}
                <Route
                  path="/main"
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
                        <Login handleLogin={handleLogin} />
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                      <Register handleRegistration={handleRegistration} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
