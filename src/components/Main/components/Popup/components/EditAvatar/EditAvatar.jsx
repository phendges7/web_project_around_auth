import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleUpdateAvatar(avatarRef.current.value);
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_url"
          id="avatar-link"
          name="firstInput"
          placeholder="URL da imagem"
          required
          type="url"
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error" data-input="firstInput"></span>
      </label>

      <button type="submit" className="popup__submit-button">
        SALVAR
      </button>
    </form>
  );
}
