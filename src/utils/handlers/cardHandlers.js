import * as api from "../api";
import { handleError } from "./errorHandler";

export function handleCardFormSubmit({ formData, setCards }) {
  const submitButton = document.querySelector(
    "#popupCard .popup__submit-button"
  );
  submitButton.textContent = "Salvando...";

  return api
    .addCard({
      name: formData.firstInput || "Título não definido",
      link: formData.secondInput || "Imagem não definida",
    })
    .then((newCard) => {
      setCards((prevCards) => [newCard, ...prevCards]);
      return newCard;
    })
    .finally(() => {
      submitButton.textContent = "CRIAR";
    });
}

export function handleCardLike(card, setCards) {
  return api.changeLikeCardStatus(card._id, !card.isLiked).then((newCard) => {
    setCards((prev) => prev.map((c) => (c._id === card._id ? newCard : c)));
  });
}

export function handleCardDelete(card, setCards) {
  return api.deleteCard(card._id).then(() => {
    setCards((prev) => prev.filter((c) => c._id !== card._id));
  });
}
