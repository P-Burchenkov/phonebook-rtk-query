import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addConntactRequest,
  addContactError,
  addConntactSuccess,
  delContactRequest,
  delContactError,
  delContactSuccess,
} from './contacts/contactsSlice';

axios.defaults.baseURL = 'https://64a6b3dc096b3f0fcc805e3f.mockapi.io';

export const fetchContacts = () => {
  return async dispatch => {
    dispatch(fetchContactsRequest());
    try {
      const responce = await axios.get('/contacts');

      if (!responce.data.length) {
        throw new Error('There is no contacts in your phonebook');
      }
      dispatch(fetchContactsSuccess(responce.data));
    } catch (error) {
      dispatch(fetchContactsError(error.message));
    }
  };
};

export const addContact = contact => {
  return async dispatch => {
    dispatch(addConntactRequest);
    try {
      axios.post('/contacts', contact);
      dispatch(addConntactSuccess(contact));
    } catch (error) {
      dispatch(addContactError(error.message));
    }
  };
};

export const deleteContact = id => {
  return async dispatch => {
    dispatch(delContactRequest);
    try {
      axios.delete(`/contacts/${id}`, id);
      dispatch(delContactSuccess(id));
    } catch (error) {
      dispatch(delContactError(error.message));
    }
  };
};
