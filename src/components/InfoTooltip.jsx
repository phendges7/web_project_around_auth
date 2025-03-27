import Popup from "./Main/components/Popup/Popup.jsx";
import successIcon from "../images/successIcon.png";
import failIcon from "../images/failIcon.png";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const messages = {
    success: {
      text: "Cadastro realizado com sucesso!",
      icon: successIcon,
      altText: "Ícone de sucesso",
    },
    error: {
      text: "Erro ao realizar cadastro",
      icon: failIcon,
      altText: "Ícone de erro",
    },
  };

  const { text, icon, altText } = isSuccess ? messages.success : messages.error;

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={null}>
      <div className="popup__container">
        <img src={icon} alt={altText} className="popup__infotootip-icon" />
        <h2
          className={`popup__infotooltip-message ${
            !isSuccess && "infotooltip__message--error"
          }`}
        >
          {text}
        </h2>
      </div>
    </Popup>
  );
}
