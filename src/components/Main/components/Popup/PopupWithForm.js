import { Popup } from "./Popup.js";
import { enableValidation } from "../../../../utils/FormValidator.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, cardSection) {
    super(popupSelector);

    // Adiciona verificação de existência do elemento
    if (!this._popup) {
      throw new Error(`Elemento ${popupSelector} não encontrado no DOM`);
    }

    this._form = this._popup.querySelector(".popup__wrapper");

    if (!this._form) {
      throw new Error("Formulário não encontrado no popup");
    }

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
