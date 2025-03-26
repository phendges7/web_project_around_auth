import { Popup } from "./Popup.js";
import { enableValidation } from "./FormValidator.js";
import { Section } from "./Section.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, cardSection) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__wrapper");
    this._inputElements = Array.from(
      this._form.querySelectorAll(".popup__input")
    );
    this._handleSubmit = handleSubmit;
    this._cardSection = cardSection;

    enableValidation();
  }

  //Metodo para pegar e atribuir valores dos campos do form
  _getInputValues() {
    const formData = {};
    this._inputElements.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = this._getInputValues();
      const params = {
        formData,
        event, // Adicionando o evento, caso precise dele
        cardSection: this._cardSection, // Mantendo o cardSection, caso esteja em uso
      };

      this._handleSubmit(params);
      this.close();
    });
  }
}
