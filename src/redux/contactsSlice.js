import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../service/api';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.fetchContacts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.addContact(contact);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { dispatch, rejectWithValue }) => {
    try {
      await api.deleteContact(contactId);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    setContacts: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    extraReducers: builder => {
      builder.addCase(fetchAllContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      });
      builder.addCase(fetchAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

      builder.addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      });
      builder.addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

      builder.addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
      builder.addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    },
  },
});

export const { setContacts, setFilter, setLoading, setError } =
  contactsSlice.actions;

export default contactsSlice.reducer;
