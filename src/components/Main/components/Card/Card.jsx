export default function Card({
  card,
  onImageClick,
  isLiked,
  onCardLike,
  onCardDelete,
}) {
  const { name, link } = card;

  const imageComponent = {
    title: name,
    children: <img src={link} alt={name} className="popup__image" />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(imageComponent)}
      />
      <button
        aria-label="DELETE"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <h2 className="card__title">{name}</h2>
      <button
        aria-label="LIKE"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></button>
    </div>
  );
}
