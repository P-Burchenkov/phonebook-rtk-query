import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { contactsSlice } from './contacts/contactsSlice';
import { filterSlice } from './filter/filterSlice';

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
