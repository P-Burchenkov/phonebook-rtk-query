import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://64a6b3dc096b3f0fcc805e3f.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'fetchContactsStatus',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get('/contacts');

      if (!responce.data.length) {
        throw new Error('There is no contacts in your phonebook');
      }
      return responce.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'addContactStatus',
  async (contact, { rejectWithValue }) => {
    try {
      const responce = await axios.post('/contacts', contact);
      return responce.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'delContactStatus',
  async (id, { rejectWithValue }) => {
    try {
      const responce = await axios.delete(`/contacts/${id}`, id);
      toast.success(
        `Number with name "${responce.data.name}" was successfully deleted from your phonebook!`
      );
      return responce.data.id;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
