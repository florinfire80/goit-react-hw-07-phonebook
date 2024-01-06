import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contactsSlice';
import { setContacts, setFilter } from '../../redux/contactsSlice';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { selectContacts, selectFilter } from '../../redux/contactsSelectors';
import {
  handleChange,
  handleSubmit,
  handleFilterChange,
  filterContacts,
  handleDelete,
} from '../utils/phonebookFunctions';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = filterContacts(contacts, filter);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        phone={phone}
        handleChange={e =>
          handleChange(e, dispatch, setName, setPhone, setFilter)
        }
        handleSubmit={e =>
          handleSubmit(
            e,
            name,
            phone,
            contacts,
            dispatch,
            setName,
            setPhone,
            setFilter,
            alert
          )
        }
      />
      <div className="filter-container">
        <label>
          Search contact:
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={e => handleFilterChange(e, dispatch)}
          />
        </label>
      </div>
      <ContactList
        contacts={filteredContacts}
        onDelete={id =>
          handleDelete(id, dispatch, filteredContacts, updatedContacts =>
            dispatch(setContacts(updatedContacts))
          )
        }
      />
    </div>
  );
};

export default Phonebook;

// Codul de mai jos se foloseste daca se elimina fisierul "phonebookFunctions.js"
// ---------------------------------------------------------
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchContacts,
//   addContact,
//   deleteContact,
// } from '../../redux/contactsSlice';
// import { setContacts, setFilter } from '../../redux/contactsSlice';
// import { nanoid } from 'nanoid';
// import ContactForm from './ContactForm';
// import ContactList from './ContactList';
// import { selectContacts, selectFilter } from '../../redux/contactsSelectors';
// import './Phonebook.module.css';

// const Phonebook = () => {
//   const contacts = useSelector(selectContacts);
//   const filter = useSelector(selectFilter);
//   const dispatch = useDispatch();

//   const [name, setName] = React.useState('');
//   const [phone, setPhone] = React.useState('');

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'name':
//         dispatch(setFilter(''));
//         setName(value);
//         break;
//       case 'phone':
//         setPhone(value);
//         break;
//       default:
//         console.error('Unhandled input name:', name);
//         break;
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (name.trim() === '' || phone.trim() === '') {
//       alert('Please fill in both name and phone number.');
//       return;
//     }

//     const isDuplicate = contacts.some(
//       contact =>
//         contact.name.toLowerCase() === name.toLowerCase() ||
//         contact.phone === phone
//     );

//     if (isDuplicate) {
//       alert('This name or phone number already exists in your contact list.');
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name,
//       phone,
//     };

//     try {
//       dispatch(addContact(newContact));

//       setName('');
//       setPhone('');
//       setFilter('');
//     } catch (error) {
//       console.error('Error adding contact:', error.message);
//       alert('Error adding contact. Please try again.');
//     }
//   };

//   const handleFilterChange = e => {
//     dispatch(setFilter(e.target.value));
//   };

//   const filteredContacts = contacts.filter(
//     contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//       contact.phone.includes(filter)
//   );

//   const handleDelete = async id => {
//     try {
//       dispatch(deleteContact(id));

//       dispatch(
//         setContacts(filteredContacts.filter(contact => contact.id !== id))
//       );
//     } catch (error) {
//       console.error('Error deleting contact:', error.message);
//       alert('Error deleting contact. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <ContactForm
//         name={name}
//         phone={phone}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//       />
//       <div className="filter-container">
//         <label>
//           Search contact:
//           <input
//             type="text"
//             name="filter"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <ContactList contacts={filteredContacts} onDelete={handleDelete} />
//     </div>
//   );
// };

// export default Phonebook;
