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
      .then(() => {
        setIsLoggedIn(true);
        console.log("Usuário registrado com sucesso!"), navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao registrar o usuário: ", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((data) => {
        console.log("Usuário logado com sucesso!", data);
        if (data.jwt) {
          setToken(data.jwt);
          setIsLoggedIn(true);
          setUserData(data.user);
          const redirectPath = location.state?.from || "/main";
          navigate(redirectPath);
        }
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

  //manipulador de curtidas
  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;

    // Obter os dados do cartão atualizados
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  //manipulador deletar cards
  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  }

  //manipulador de adicionar cards
  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((createdCard) => {
        setCards([createdCard, ...cards]);
        handleClosePopup(); // Fecha o popup depois de adicionar o card
      })
      .catch((error) => console.error(error));
  };

  //------------- POPUP -------------//
  //manipulador de abrir popup
  const handleOpenPopup = (popup) => {
    setPopup(popup);
    document.querySelector(".overlay")?.classList.add("visible");
  };

  //manipulador de fechar popup
  const handleClosePopup = () => {
    setPopup(null);
    document.querySelector(".overlay")?.classList.remove("visible");
  };

  //------------- PROFILE -------------//
  //carregar dados do usuário
  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  //manipulador de atualizar usuário
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  //manipulador de atualizar avatar
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .updateAvatar(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  //------------- RENDER -------------//
  return (
    <AppContext.Provider value={{ isLoggedIn }}>
      <CurrentUserContext.Provider
        value={(userData, handleUpdateUser, handleUpdateAvatar)}
      >
        <CardContext.Provider
          value={{
            handleAddPlaceSubmit,
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
                      <div className="login__container">
                        <Login handleLogin={handleLogin} />
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                      <div className="registerContainer">
                        <Register handleRegistration={handleRegistration} />
                      </div>
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
