import { Section } from "../components/Section.js";
//import { PopupWithForm } from "../components/Main/components/Popup/PopupWithForm.js";
import { PopupWithImage } from "../components/Main/components/Popup/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/Main/components/Popup/PopupWithConfirmation.js";

import { Card } from "../components/Card.js";

import { SELECTORS } from "../utils/config.js";
import * as api from "../utils/api.js";
import { validateToken } from "../utils/auth.js";

import {
  handleProfileFormSubmit,
  handleCardFormSubmit,
  handleDeleteCard,
  handleAvatarFormSubmit,
  handleError,
} from "../utils/handlers.js";

// INSTANCIA CARD SECTION
const cardSection = new Section(
  {
    renderer: (data) => createCard(data),
  },
  SELECTORS.cardContainer
);

/* INSTANCIA POPUPS
const popups = {
  profile: new PopupWithForm(
    SELECTORS.profilePopup,
    handleProfileFormSubmit,
    cardSection
  ),
  avatar: new PopupWithForm(
    SELECTORS.avatarPopup,
    handleAvatarFormSubmit,
    cardSection
  ),
  card: new PopupWithForm(
    SELECTORS.cardPopup,
    handleCardFormSubmit,
    cardSection
  ),
  deleteCard: new PopupWithConfirmation(
    SELECTORS.deleteCardPopup,
    handleDeleteCard,
    cardSection
  ),
  image: new PopupWithImage(SELECTORS.imagePopup),
};*/

// FUNCTION - CRIA NOVO CARD
export function createCard(data) {
  const card = new Card(
    data,
    SELECTORS.cardTemplate,
    (name, link) => popups.image.open(name, link),
    (event, cardId) => popups.deleteCard.open(event, cardId)
  );
  return card.generateCard();
}

// FUNCTION - POPULA DADOS INICIAIS
async function loadInitialData() {
  try {
    const cardData = await api.getInitialCards();
    cardSection.renderItems(cardData);
  } catch (error) {
    const errorMessage = handleError(error);
    alert(errorMessage);
  }
}

/* FUNCTION - CONFIGURA EVENT LISTENERS
function setupEventListeners() {
  document
    .querySelector(SELECTORS.profileEditButton)
    .addEventListener("click", () => popups.profile.open());
  document
    .querySelector(SELECTORS.profileEditAvatarButton)
    .addEventListener("click", () => popups.avatar.open());
  document
    .querySelector(SELECTORS.cardAddButton)
    .addEventListener("click", () => popups.card.open());

  Object.values(popups).forEach((popup) => popup.setEventListeners());
}*/

//loadInitialData();
//setupEventListeners();

// FUNCTION - INICIALIZA APP
function initializeApp() {
  //setupEventListeners();
  loadInitialData();
}

// Inicia aplicação quando DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});
