import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContactsAsync,
  addContactAsync,
  deleteContactAsync,
} from '../../service/api';
import { setContacts, setFilter } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

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

    const newContact = {
      id: nanoid(),
      name,
      phone: number,
    };

    try {
      const resolvedContactData = await addContactAsync(newContact);

      dispatch(setContacts([...contacts, resolvedContactData]));

      setName('');
      setNumber('');
      dispatch(setFilter(''));
    } catch (error) {
      console.error('Error adding contact:', error.message);
      alert('Error adding contact. Please try again.');
    }
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );

  const handleDelete = async id => {
    try {
      await dispatch(deleteContactAsync(id));

      dispatch(
        setContacts(filteredContacts.filter(contact => contact.id !== id))
      );
    } catch (error) {
      console.error('Error deleting contact:', error.message);
      alert('Error deleting contact. Please try again.');
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
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
