// src/contexts/AppContext.js
import { createContext } from "react";

const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}, // Função vazia como valor padrão
});

export default AppContext;
