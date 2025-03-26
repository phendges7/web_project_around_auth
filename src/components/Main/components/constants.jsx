import EditAvatar from "./Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./Popup/components/EditProfile/EditProfile";
import NewCard from "./Popup/components/NewCard/NewCard";

export const Popups = {
  editAvatarPopup: {
    title: "Alterar foto de perfil",
    children: <EditAvatar />,
  },
  editProfilePopup: { title: "Editar perfil", children: <EditProfile /> },
  newCardPopup: { title: "Novo local", children: <NewCard /> },
};
