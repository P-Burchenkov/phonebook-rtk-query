import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchContactsRequest: state => {
      state.isLoading = true;
    },
    fetchContactsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.contactList = action.payload;
    },
    fetchContactsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.contactList = [];
    },
    addConntactRequest: state => {
      state.isLoading = true;
    },
    addConntactSuccess: (state, action) => {
      state.isLoading = false;
      state.contactList.push(action.payload);
      state.error = null;
    },
    addContactError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    delContactRequest: state => {
      state.isLoading = true;
    },
    delContactSuccess: (state, action) => {
      state.isLoading = false;
      state.contactList.filter(el => {
        return el.id !== action.payload;
      });
      return {
        ...state,
        isLoading: false,
        contactList: state.contactList.filter(el => {
          return el.id !== action.payload;
        }),
      };
    },
    delContactError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addConntactRequest,
  addConntactSuccess,
  addContactError,
  delContactRequest,
  delContactSuccess,
  delContactError,
} = contactsSlice.actions;

export const getContacts = state => state.contacts.contactList;
