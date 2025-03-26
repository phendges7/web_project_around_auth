import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";

import * as api from "../utils/api";

import {
  handleProfileFormSubmit,
  handleCardFormSubmit,
  handleDeleteCard,
  handleAvatarFormSubmit,
  handleError,
} from "../scripts/utils.js";

//CONTAINERS UTEIS
const pageContainer = document.querySelector(".page");
const cardSectionContainer = document.querySelector(".card-grid");

//SELETOR DE ELEMENTOS DOM
const nameSelector = ".profile__name";
const descriptionSelector = ".profile__description";
const avatarSelector = ".profile__picture";

//INSTANCIA OBJETO USERINFO
const userInfo = new UserInfo(
  nameSelector,
  descriptionSelector,
  avatarSelector
);

// Cria nova secao - secao de cards
const cardSection = new Section(
  {
    items: [],
    renderer: (data) => renderCard(data, cardSection), // Passando a instância correta
  },
  cardSectionContainer
);

// FUNCTION - Renderiza card
export const renderCard = (data, cardSection) => {
  const card = new Card(
    data.name,
    data.link,
    data._id,
    data.isLiked,
    "#cardTemplate",
    handleCardClick,
    handleDeleteClick
  );
  const cardElement = card.generateCard();

  cardSection.addItem(cardElement);
};

//GARANTE PAGINA ESTAR DEVIDAMENTE CARREGADA
document.addEventListener("DOMContentLoaded", () => {
  loadPageData();
});

// INICIA APLICACAO
function loadPageData() {
  pageContainer.style.display = "none"; //OCULTA PAGINA ENQUANTO REQUESTS FINALIZAM
  api
    .fetchUserAndCards()
    .then(([userData, cardData]) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });

      // Renderiza os cards na section
      cardSection._items = cardData;
      cardSection.renderItems();
    })
    .then(() => {
      pageContainer.style.display = "flex"; //EXIBE PAGINA AFTER FULLY LOADED
    })
    .catch((err) => {
      const errorMessage = handleError(err);
      alert(errorMessage);
    });
}

/***********************************/
// Instancia popup para editar PERFIL
const popupProfileForm = new PopupWithForm(
  "#popupProfile",
  handleProfileFormSubmit
);
popupProfileForm.setEventListeners();

// Instancia popup para EDITAR AVATAR
const popupAvatarForm = new PopupWithForm(
  "#popupAvatar",
  handleAvatarFormSubmit
);
popupAvatarForm.setEventListeners();

// Instancia popup para ADICIONAR CARD
const popupCardForm = new PopupWithForm(
  "#popupCard",
  handleCardFormSubmit,
  cardSection
);
popupCardForm.setEventListeners();

//Instancia popup para DELETAR CARD
const popupDeleteCard = new PopupWithConfirmation(
  "#popupDeleteCard",
  handleDeleteCard
);
popupDeleteCard.setEventListeners();

// Instancia popup de IMAGEM EXPANDIDA
const popupImage = new PopupWithImage(".popupImage");
popupImage.setEventListeners();

/***********************************/
//CARDS
// Manipula clique no card
export const handleCardClick = (name, link) => {
  popupImage.open(link, name);
};

// Manipula click na lixeira
export const handleDeleteClick = (event, cardId) => {
  popupDeleteCard.open(event, cardId);
};

/***********************************/
//EVENT LISTENERS PARA POPUPS
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  popupProfileForm.open();
});

const addCardButton = document.querySelector(".profile__add-place-button");
addCardButton.addEventListener("click", () => {
  popupCardForm.open();
});

const editAvatarButton = document.querySelector(".profile__picture-container");
editAvatarButton.addEventListener("click", () => {
  popupAvatarForm.open();
});

/**********************************/
