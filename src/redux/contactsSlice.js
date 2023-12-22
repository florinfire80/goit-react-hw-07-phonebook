import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addContactApi, fetchContactsApi, deleteContactApi } from 'service/api';

// Operația asincronă pentru obținerea contactelor
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetchContactsApi();
  return response;
});

// Operația asincronă pentru adăugarea unui contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contactData => {
    const response = await addContactApi(contactData);
    return response;
  }
);

// Operația asincronă pentru ștergerea unui contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await deleteContactApi(contactId);
    return contactId;
  }
);

export const contactsSlice = createSlice({
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
  },
  extraReducers: builder => {
    // Reducer pentru succesul operației fetchContacts
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    // Reducer pentru începutul operației fetchContacts
    builder.addCase(fetchContacts.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    // Reducer pentru eroare în operația fetchContacts
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Reducer pentru succesul operației addContact
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });

    // Reducer pentru începutul operației addContact
    builder.addCase(addContact.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    // Reducer pentru eroare în operația addContact
    builder.addCase(addContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Reducer pentru succesul operației deleteContact
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      state.isLoading = false;
      state.error = null;
    });

    // Reducer pentru începutul operației deleteContact
    builder.addCase(deleteContact.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    // Reducer pentru eroare în operația deleteContact
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setContacts, setFilter, setLoading, setError } =
  contactsSlice.actions;
export default contactsSlice.reducer;
