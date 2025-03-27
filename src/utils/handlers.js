import { renderCard } from "../page/index.js";
import * as api from "../utils/api";

// FUNCTION - MANIPULAR SUBMIT DE PERFIL
export function handleProfileFormSubmit(params) {
  const { formData } = params;

  const submitButton = document.querySelector(
    "#popupProfile .popup__submit-button"
  );
  submitButton.textContent = "Salvando...";
  submitButton.disabled = true;
  submitButton.classList.add("disabled");

  api
    .updateUserInfo({
      name: formData.firstInput,
      about: formData.secondInput,
    })
    .then((updatedUserData) => {
      submitButton.textContent = "SALVAR";
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
      userInfo.setUserInfo({
        name: updatedUserData.name,
        description: updatedUserData.about,
      });
    })
    .catch((err) => {
      const errorMessage = handleError(err);
      alert(errorMessage);
    });
}

// FUNCTION - MANIPULAR SUBMIT DE CARD
export function handleCardFormSubmit(params) {
  const { event, formData, cardSection } = params;

  const submitButton = document.querySelector(
    "#popupCard .popup__submit-button"
  );
  submitButton.textContent = "Salvando...";
  submitButton.disabled = true;
  submitButton.classList.add("disabled");

  const cardName = formData.firstInput || "Título não definido";
  const cardLink = formData.secondInput || "Imagem não definida";

  api
    .addCard({ name: cardName, link: cardLink })
    .then((newCardData) => {
      renderCard(newCardData, cardSection);

      submitButton.textContent = "CRIAR";
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
      event.target.reset();
    })
    .catch((err) => {
      const errorMessage = handleError(err);
      alert(errorMessage);
    });
}

// FUNCTION - MANIPULAR UPDATE AVATAR
export function handleAvatarFormSubmit(params) {
  const { formData } = params;
  const submitButton = document.querySelector(
    "#popupAvatar .popup__submit-button"
  );

  submitButton.textContent = "Salvando...";
  submitButton.disabled = true;
  submitButton.classList.add("disabled");

  api
    .updateAvatar(formData.firstInput)
    .then(() => {
      const avatarImage = document.querySelector(".profile__picture");
      avatarImage.src = formData.firstInput;

      submitButton.textContent = "SALVAR";
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    })
    .catch((err) => {
      const errorMessage = handleError(err);
      alert(errorMessage);
    });
}

// FUNCTION - MANIPULAR CARD DELETE
export function handleDeleteCard(event, cardId) {
  const deleteButton = event.target;
  const cardElement = deleteButton.closest(".card");

  if (cardElement) {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        const errorMessage = handleError(err);
        alert(errorMessage);
      });
  }
}

// FUNCTION - MANIPULAR ERROS
export function handleError(err) {
  switch (err.type) {
    case "network":
      // Tratamento de erros de rede
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    case "syntax":
      // Tratamento de erros de resposta malformada
      return "Erro no servidor. Tente novamente mais tarde.";
    case "unknown":
    default:
      // Tratamento de erros genéricos
      return err.message || "Ocorreu um erro inesperado. Tente novamente.";
  }
}

// FUNCTION - MANIPULAR LIKE
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

// FUNCTION - MANIPULAR DELETAR CARD
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

//------------- POPUP -------------//
// FUNCTION - MANIPULAR ABRIR POPUP
const handleOpenPopup = (popup) => {
  setPopup(popup);
  document.querySelector(".overlay")?.classList.add("visible");
};

// FUNCTION - MANIPULAR FECHAR POPUP
const handleClosePopup = () => {
  setPopup(null);
  document.querySelector(".overlay")?.classList.remove("visible");
};
