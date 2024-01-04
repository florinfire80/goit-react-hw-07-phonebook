import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/contactsSlice';
import { setContacts, setFilter } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { selectContacts, selectFilter } from '../../redux/contactsSelectors';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  useEffect(() => {
    dispatch(fetchContacts());
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
        console.error('Unhandled input name:', name);
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in both name and phone number.');
      return;
    }

    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.phone === number
    );

    if (isDuplicate) {
      alert('This name or phone number already exists in your contact list.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone: number,
    };

    try {
      dispatch(addContact(newContact));

      setName('');
      setNumber('');
      setFilter('');
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
      dispatch(deleteContact(id));

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
