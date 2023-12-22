// components/Phonebook.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setContacts,
  addContact,
  deleteContact,
  setFilter,
  setLoading,
  setError,
} from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { addContactApi } from 'service/api';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setFilter(''));
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      console.log('Before fetching contacts...');
      const newContact = await addContactApi({ name, number });

      console.log('After fetching contacts:', contacts);

      dispatch(addContact(newContact));
      dispatch(setLoading(false));
      dispatch(setError(null));

      setName('');
      setNumber('');
      dispatch(setFilter(''));
    } catch (error) {
      dispatch(setError('Failed to add contact'));
      dispatch(setLoading(false));
    }
  };

  const nameExists = contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
  const numberExists = contacts.some(contact => contact.number === number);

  if (nameExists) {
    alert(
      'The contact with this name already exists in the phonebook. Please choose a different name.'
    );
    return null;
  }

  if (numberExists) {
    alert(
      'This phone number already exists in the phone book. Please choose a different phone number.'
    );
    return null;
  }

  if (name.trim() === '' || number.trim() === '') {
    alert('Please fill in all fields to add a contact.');
    return null;
  }

  const newContact = {
    id: nanoid(),
    name,
    number,
  };

  dispatch(addContact(newContact));
  setName('');
  setNumber('');
  dispatch(setFilter(''));

  dispatch(setContacts([...contacts, newContact]));

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ContactForm
        name={name}
        number={number}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="filter-container">
        <label>
          Search contact:
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};

export default Phonebook;
