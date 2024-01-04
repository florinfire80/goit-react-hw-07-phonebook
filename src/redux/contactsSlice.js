import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactsService from '../service/api';

const initialState = {
  status: 'idle',
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    return contactsService.get();
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    return contactsService.create(newContact);
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    return contactsService.remove(contactId);
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setContacts, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
