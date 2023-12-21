import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { list: [], filter: '' },
  reducers: {
    setContacts: (state, action) => {
      state.list = action.payload;
    },
    addContact: (state, action) => {
      state.list.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.list = state.list.filter(contact => contact.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setContacts, addContact, deleteContact, setFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
