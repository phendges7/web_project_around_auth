import EditAvatar from "./Popup/components/EditAvatar";
import EditProfile from "./Popup/components/EditProfile";
import NewCard from "./Popup/components/NewCard";

export const Popups = {
  editAvatarPopup: {
    title: "Alterar foto de perfil",
    children: <EditAvatar />,
  },
  editProfilePopup: { title: "Editar perfil", children: <EditProfile /> },
  newCardPopup: { title: "Novo local", children: <NewCard /> },
};
