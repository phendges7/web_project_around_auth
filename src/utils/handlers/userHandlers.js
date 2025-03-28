import * as api from "../api";

export function handleProfileFormSubmit({ formData, setCurrentUser }) {
  const submitButton = document.querySelector(
    "#popupProfile .popup__submit-button"
  );
  submitButton.textContent = "Salvando...";

  return api
    .updateUserInfo({
      name: formData.firstInput,
      about: formData.secondInput,
    })
    .then((updatedUserData) => {
      setCurrentUser((prev) => ({
        ...prev,
        name: updatedUserData.name,
        about: updatedUserData.about,
      }));
      return updatedUserData;
    })
    .finally(() => {
      submitButton.textContent = "SALVAR";
    });
}

export function handleAvatarFormSubmit({ formData, setCurrentUser }) {
  const submitButton = document.querySelector(
    "#popupAvatar .popup__submit-button"
  );
  submitButton.textContent = "Salvando...";

  return api
    .updateAvatar(formData.firstInput)
    .then(() => {
      setCurrentUser((prev) => ({
        ...prev,
        avatar: formData.firstInput,
      }));
    })
    .finally(() => {
      submitButton.textContent = "SALVAR";
    });
}
