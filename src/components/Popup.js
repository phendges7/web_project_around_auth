export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlay = document.querySelector(".overlay");
    this._isOpen = false;
  }

  // Função para abrir popup e exibir overlay
  open() {
    if (!this._isOpen) {
      this._overlay.classList.add("visible");
      this._popup.classList.add("popup__opened");
      this._isOpen = true;
      document.addEventListener("keydown", this._handleEscClose.bind(this));
    }
  }

  // Função para fechar popup e esconder overlay
  close() {
    if (this._isOpen) {
      this._overlay.classList.remove("visible");
      this._popup.classList.remove("popup__opened");
      this._isOpen = false;
    }
  }

  // Ouvintes
  setEventListeners() {
    // Clicar botao FECHAR
    const closeButton = this._popup.querySelector(".popup__close-button");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
    // Clicar fora do popup
    this._overlay.addEventListener("click", (event) => {
      if (!this._popup.contains(event.target)) {
        this.close();
      }
    });
  }

  // Pressionar da tecla ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
