import EditAvatar from "./Popup/components/EditAvatarPopup";
import EditProfile from "./Popup/components/EditProfilePopup";
import AddPlace from "./Popup/components/AddPlacePopup";
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
  addPlacePopup: {
    type: "addPlacePopup",
    title: "Novo local",
    children: <AddPlace />,
  },
  imagePopup: {
    type: "imagePopup",
    title: "",
    children: <ImagePopup />,
  },
};
