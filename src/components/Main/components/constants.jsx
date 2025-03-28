import EditAvatar from "./Popup/components/EditAvatar";
import EditProfile from "./Popup/components/EditProfile";
import NewCard from "./Popup/components/NewCard";

export const PopupTypes = {
  EDIT_AVATAR: "editAvatarPopup",
  EDIT_PROFILE: "editProfilePopup",
  NEW_CARD: "newCardPopup",
};

export const Popups = {
  [PopupTypes.EDIT_AVATAR]: {
    title: "Alterar foto de perfil",
    children: <EditAvatar />,
  },
  [PopupTypes.EDIT_PROFILE]: {
    title: "Editar perfil",
    children: <EditProfile />,
  },
  [PopupTypes.NEW_CARD]: {
    title: "Novo local",
    children: <NewCard />,
  },
};
