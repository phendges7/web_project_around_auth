import { useState, useContext } from "react";
import CardContext from "../../../../../../contexts/CardContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CardContext);

  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleAddPlaceSubmit({
      name: placeName,
      link: placeLink,
    });

    setPlaceName("");
    setPlaceLink("");
  };

  return (
    <form className="popup__form" name="new-card-form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_place"
          id="place-name"
          name="firstInput"
          placeholder="Nome do local"
          required
          type="text"
          minLength="2"
          maxLength="30"
          value={placeName}
          onChange={(evt) => setPlaceName(evt.target.value)}
        />
        <span className="popup__input-error" data-input="firstInput"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="place-link"
          name="secondInput"
          placeholder="URL da imagem"
          required
          type="url"
          value={placeLink}
          onChange={(evt) => setPlaceLink(evt.target.value)}
        />
        <span className="popup__input-error" data-input="secondInput"></span>
      </label>
      <button type="submit" className="popup__submit-button">
        SALVAR
      </button>
    </form>
  );
}
