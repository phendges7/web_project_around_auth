export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this.avatarSelector.src,
    };
  }

  setUserInfo({ name, description, avatar }) {
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
