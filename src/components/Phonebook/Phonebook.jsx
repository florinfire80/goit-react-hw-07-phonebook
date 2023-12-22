import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  setFilter,
  fetchAllContacts,
} from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setFilter(''));
        setName(value);
        break;
      case 'phone':
        setPhone(value);
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
    const phoneExists = contacts.some(contact => contact.phone === phone);

    if (nameExists) {
      alert(
        'The contact with this name already exists in the phonebook. Please choose a different name.'
      );
      return;
    }

    if (phoneExists) {
      alert(
        'This phone number already exists in the phone book. Please choose a different phone number.'
      );
      return;
    }

    if (name.trim() === '' || phone.trim() === '') {
      alert('Please fill in all fields to add a contact.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone,
    };

    dispatch(addContact(newContact));
    setName('');
    setPhone('');
    dispatch(setFilter(''));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactForm
        name={name}
        phone={phone}
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
