import { useEffect } from "react";

export default function Popup({ isOpen, onClose, title, children }) {
  // FECHAR COM ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  // ADICIONAR E REMOVER CLASSE VISIVEL DO OVERLAY
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    if (!overlay) return;

    if (isOpen) {
      overlay.classList.add("visible");
    } else {
      overlay.classList.remove("visible");
    }
  }, [isOpen]);

  // FECHAR COM CLIQUE FORA DO POPUP
  const handleOverlayClick = (e) => {
    const popupContent = e.currentTarget.querySelector(".popup");
    if (e.target === e.currentTarget || !popupContent.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="popup popup__opened">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Fechar"
        />
        {title && <h2 className="popup__title">{title}</h2>}
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
}
