export default function Popup(props) {
  const { onClose, title, children } = props;

  const className = title ? "popup__content" : "popup__image-content";

  return (
    <div className={`popup popup__opened`}>
      <div className={className}>
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
