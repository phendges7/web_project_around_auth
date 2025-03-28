import { useContext, useEffect, useState } from "react";

import { fetchUserAndCards } from "../../utils/api.js";

import Popup from "./components/Popup/Popup.jsx";
import editProfileButton from "../../images/editButton.svg";
import avatar from "../../images/avatarDefault.jpg";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import CardContext from "../../contexts/CardContext.js";

export default function Main({ onOpenPopup, onClosePopup, popup }) {
  // Contextos atuais
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { handleCardLike, handleCardDelete } = useContext(CardContext);
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
  }, [setCurrentUser, setCards]);

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  // FUNCTION - LIKE CARD
  const handleLike = async (card) => {
    try {
      await handleCardLike(card);
      setCards((prevCards) =>
        prevCards.map((c) =>
          c._id === card._id ? { ...c, isLiked: !c.isLiked } : c
        )
      );
    } catch (error) {
      console.error("Erro ao dar like no card:", error);
    }
  };

  // FUNCTION - DELETAR CARD
  const handleDelete = async (card) => {
    try {
      await handleCardDelete(card);
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    }
  };

  // FUNCTION - CRIAR NOVO CARD
  const handleAddCard = (formData) => {
    if (formData.newCard) {
      setCards((prevCards) => [formData.newCard, ...prevCards]);
    }
  };

  return (
    <>
      {/*------------- PROFILE -------------*/}
      <div className="profile">
        <div className="profile__picture-container">
          <img
            src={currentUser?.avatar || avatar}
            alt="Foto de Perfil"
            className="profile__picture"
          />
          <div
            className="profile__overlay"
            onClick={() => onOpenPopup("editAvatarPopup")}
          ></div>
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name || "Usuário"}</h1>
            <img
              src={editProfileButton}
              alt="Editar Perfil"
              className="profile__edit-button"
              onClick={() => onOpenPopup("editProfilePopup")}
            />
          </div>
          <p className="profile__description">{currentUser?.about || ""}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-place-button"
          type="button"
          onClick={() => onOpenPopup("addPlacePopup")}
        ></button>
      </div>

      {/*------------- POPUP -------------*/}
      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          className="popup__opened"
        >
          {popup.children}
        </Popup>
      )}

      {/*------------- CARDS -------------*/}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            isLiked={card.isLiked}
            onCardLike={handleLike}
            onCardDelete={handleDelete}
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
