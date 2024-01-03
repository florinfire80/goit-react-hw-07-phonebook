import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContactsAsync,
  addContactAsync,
  deleteContactAsync,
} from '../service/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setContacts: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContactsAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        const deletedContactId = action.payload;
        state.items = state.items.filter(
          contact => contact.id !== deletedContactId
        );
      });
  },
});

export const { setContacts, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
