import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import { handleCardFormSubmit } from "../utils/handlers";

import Register from "./Register";
import Login from "../components/Login";
import Header from "./Header";
import Main from "./Main/Main";
import Footer from "./Footer";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import AppContext from "../contexts/AppContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // FUNCTION - REGISTRO
  const onRegister = async ({ email, password }) => {
    try {
      await auth.register({ email, password });
      setIsRegistrationSuccess(true);
      navigate("/signin");
    } catch (error) {
      setIsRegistrationSuccess(false);
    } finally {
      setIsInfoTooltipOpen(true);
    }
  };

  // FUNCTION - LOGIN
  const onLogin = async ({ email, password }) => {
    try {
      const jwtToken = await auth.authorize(email, password);
      if (!jwtToken) throw new Error("Token não recebido");

      const userData = await auth.getUserInfo(jwtToken);

      setToken(jwtToken);
      setIsLoggedIn(true);
      setCurrentUser({
        email: userData.data.email,
        _id: userData.data._id,
      });

      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      removeToken();
      setIsLoggedIn(false);
    }
  };

  // FUNCTION - VALIDA TOKEN
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
          navigate(location.state?.from || "/");
        })
        .catch(() => {
          removeToken(); // Remove token se validacao falha
        });
    }
  }, []);

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
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                {/* ROTA PRIVADA */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Main setIsLoggedIn={setIsLoggedIn} />
                    </ProtectedRoute>
                  }
                />
                {/* ROTA PUBLICA */}
                <Route
                  path="/signin"
                  element={
                    <div className="login">
                      <Login onLogin={onLogin} />
                    </div>
                  }
                />
                <Route
                  path="/signup"
                  element={<Register onRegister={onRegister} />}
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
