import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
  }

  open(event, cardId) {
    super.open();
    this._cardId = cardId;
    this._event = event;
  }

  setEventListeners() {
    super.setEventListeners();

    const confirmButton = this._popup.querySelector(".popup__submit-button");

    confirmButton.addEventListener("click", () => {
      this._handleDeleteCard(this._event, this._cardId);
      this.close();
    });
  }
}
