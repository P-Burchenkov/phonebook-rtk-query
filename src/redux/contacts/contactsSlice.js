import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      return (state.contacts = state.contacts.filter(
        el => el.id !== action.payload
      ));
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const getContacts = state => state.contacts;
