import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings/settingsSlice";
import categoriesReducer from "./categories/categoriesSlice";
import emiratesReducer from "./emirates/emiratesSlice";
import userReducer from "./user/userSlice";
import languageReducer from "./languageSlice/languageSlice";
import modalsReducer from "./modals/modalsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    categories: categoriesReducer,
    emirates: emiratesReducer,
    user: userReducer,
    language: languageReducer,
    modals: modalsReducer,
  },
});
