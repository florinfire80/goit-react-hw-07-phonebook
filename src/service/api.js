import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://658467c94d1ee97c6bcfadd0.mockapi.io/contacts';

const fetchContactsAsync = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching contacts: ${error.message}`);
  }
});

const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    try {
      const response = await axios.post(`${(BASE_URL, newContact)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(`Error adding contact: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error adding contact: ${error.message}`);
    }
  }
);

const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      await axios.delete(`${BASE_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`);
    }
  }
);

export { fetchContactsAsync, addContactAsync, deleteContactAsync };
