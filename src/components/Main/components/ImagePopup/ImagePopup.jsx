import Popup from "../Popup/Popup";

export default function ImagePopup({ card, onClose }) {
  return (
    <Popup onClose={onClose} title={null}>
      <div>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__image-title">{card.name}</h3>
      </div>
    </Popup>
  );
}
