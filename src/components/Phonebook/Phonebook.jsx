import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setContacts,
  addContact,
  deleteContact,
  setFilter,
} from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.list);
  const filter = useSelector(state => state.contacts.filter);
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

  const handleSubmit = e => {
    e.preventDefault();

    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const numberExists = contacts.some(contact => contact.number === number);

    if (nameExists) {
      alert(
        'The contact with this name already exists in the phonebook. Please choose a different name.'
      );
      return;
    }

    if (numberExists) {
      alert(
        'This phone number already exists in the phone book. Please choose a different phone number.'
      );
      return;
    }

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in all fields to add a contact.');
      return;
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
  };

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
