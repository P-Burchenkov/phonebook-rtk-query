import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchContacts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.contacts = [];
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addContact.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
        isLoading: false,
        contacts: state.contacts.filter(el => {
          return el.id !== action.payload;
        }),
      };
    });
    builder.addCase(deleteContact.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});
