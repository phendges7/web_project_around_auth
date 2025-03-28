import { useContext, useEffect, useState } from "react";

import { getUserInfo } from "../../utils/api.js";

import editProfileButton from "../../images/editButton.svg";
import avatar from "../../images/avatarDefault.jpg";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup.jsx";
import { Popups } from "./components/constants.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards = [],
  onCardLike,
  onCardDelete,
}) {
  //carregar dados do usuário
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
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
            <h1 className="profile__name">{currentUser?.name}</h1>
            <img
              src={editProfileButton}
              alt="Editar Perfil"
              className="profile__edit-button"
              onClick={() => onOpenPopup(Popups.editProfilePopup)}
            />
          </div>
          <p className="profile__description">{currentUser?.about}</p>
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
        {Array.isArray(cards) &&
          cards.map((card) => (
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
