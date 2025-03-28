import { useContext, useEffect, useState } from "react";

import { fetchUserAndCards } from "../../utils/api.js";

// POPUPS
import { Popups } from "./components/constants.jsx";
import Popup from "./components/Popup/Popup.jsx";

//
import editProfileButton from "../../images/editButton.svg";
import avatar from "../../images/avatarDefault.jpg";

import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  onCardLike,
  onCardDelete,
}) {
  // Contexto do usuário atual
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  // Carregar dados do usuário
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userData, cardsData] = await fetchUserAndCards();

        if (!userData) {
          throw new Error("Dados do usuário não encontrados");
        }

        setCurrentUser((prev) => ({
          ...prev,
          name: userData.name || "",
          about: userData.about || "",
          avatar: userData.avatar || avatar,
          _id: userData._id || "",
        }));

        // Verifica se cardsData existe e é um array antes de mapear
        const processedCards = Array.isArray(cardsData)
          ? cardsData.map((card) => ({
              ...card,
              isLiked:
                card.likes?.some((like) => like._id === userData._id) || false,
            }))
          : [];

        setCards(processedCards);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <>
      <div className="profile">
        <div className="profile__picture-container">
          <img
            src={currentUser?.avatar || avatar}
            alt="Foto de Perfil"
            className="profile__picture"
          />
          <div
            className="profile__overlay"
            onClick={() => onOpenPopup(Popups.editAvatarPopup)}
          ></div>
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name || "Usuário"}</h1>
            <img
              src={editProfileButton}
              alt="Editar Perfil"
              className="profile__edit-button"
              onClick={() => onOpenPopup(Popups.editProfilePopup)}
            />
          </div>
          <p className="profile__description">{currentUser?.about || ""}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-place-button"
          type="button"
          onClick={() => onOpenPopup(Popups.newCardPopup)}
        ></button>
      </div>
      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          className="popup__opened"
        >
          {popup.children}
        </Popup>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            isLiked={card.isLiked}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onImageClick={() =>
              onOpenPopup({
                title: "",
                children: <ImagePopup card={card} onClose={onClosePopup} />,
              })
            }
          />
        ))}
      </div>
    </>
  );
}
