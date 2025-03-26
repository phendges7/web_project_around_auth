import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popupImage__big");
    this._captionElement = this._popup.querySelector(".popupImage__title");
  }

  open(imageUrl, caption) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;

    super.open();
  }
}
