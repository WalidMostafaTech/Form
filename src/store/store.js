import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings/settings";
import profileReducer from "./profile/profileSlice";
import languageReducer from "./languageSlice/languageSlice";
import modalsReducer from "./modals/modalsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    profile: profileReducer,
    language: languageReducer,
    modals: modalsReducer,
  },
});
