import api from "./Api.js";

export class Card {
  constructor(
    name,
    link,
    id,
    isLiked,
    templateSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // Metodo privado para obter o template do cartão
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Ouvintes de eventos
  _setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._likeButton)
    );
    this._deleteButton.addEventListener("click", (event) =>
      this._handleDeleteClick(event, this._id)
    );
  }

  // Manipula clique no botão de "curtir"
  _handleLikeClick(likeButton) {
    const isActive = likeButton.classList.contains("active");
    if (isActive) {
      api
        .removeCardLike(this._id)
        .then(() => {
          likeButton.classList.remove("active");
          this._isLiked = false;
        })
        .catch((err) => {
          console.error("Erro ao remover curtida:", err);
        });
    } else {
      api
        .addCardLike(this._id)
        .then(() => {
          likeButton.classList.add("active");
          this._isLiked = true;
        })
        .catch((err) => {
          console.error("Erro ao add curtida:", err);
        });
    }
  }

  // Manipulação clique "excluir"
  _handleDeleteClick(cardId) {
    this.popupDeleteCard.open(cardId);
  }

  // retorna elemento card completo
  generateCard() {
    this._element = this._getTemplate();

    // Declarando variáveis para elementos específicos
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("active");
    }

    this._setEventListeners();

    return this._element;
  }
}
