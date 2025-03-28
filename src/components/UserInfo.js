export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = nameSelector;
    this._descriptionElement = descriptionSelector;
    this.avatarSelector = avatarSelector;

    this._nameElement = null;
    this._descriptionElement = null;
    this._avatarElement = null;
  }

  // Método para garantir que os elementos estão disponíveis
  _ensureElements() {
    if (!this._nameElement) {
      this._nameElement = document.querySelector(this._nameSelector);
      if (!this._nameElement)
        throw new Error(`Elemento ${this._nameSelector} não encontrado`);
    }
    if (!this._descriptionElement) {
      this._descriptionElement = document.querySelector(
        this._descriptionSelector
      );
      if (!this._descriptionElement)
        throw new Error(`Elemento ${this._descriptionSelector} não encontrado`);
    }
    if (!this._avatarElement) {
      this._avatarElement = document.querySelector(this._avatarSelector);
      if (!this._avatarElement)
        throw new Error(`Elemento ${this._avatarSelector} não encontrado`);
    }
  }

  getUserInfo() {
    debugger;
    this._ensureElements();
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this.avatarSelector.src,
    };
  }

  setUserInfo({ name, description, avatar }) {
    debugger;
    if (name) {
      this._nameElement.textContent = name;
    }

    if (description) {
      this._descriptionElement.textContent = description;
    }

    if (avatar) {
      this.avatarSelector.src = avatar;
    }
  }
}
