import EditAvatar from "./Popup/components/EditAvatar";
import EditProfile from "./Popup/components/EditProfile";
import NewCard from "./Popup/components/NewCard";
import ImagePopup from "./Popup/components/ImagePopup";

export const Popups = {
  editAvatarPopup: {
    type: "editAvatarPopup",
    title: "Alterar foto de perfil",
    children: <EditAvatar />,
  },
  editProfilePopup: {
    type: "editProfilePopup",
    title: "Editar perfil",
    children: <EditProfile />,
  },
  newCardPopup: {
    type: "newCardPopup",
    title: "Novo local",
    children: <NewCard />,
  },
  imagePopup: {
    type: "imagePopup",
    title: "",
    children: null,
  },
};
