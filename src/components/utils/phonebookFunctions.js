import { nanoid } from 'nanoid';
import { setFilter } from '../../redux/contactsSlice';
import { addContact, deleteContact } from '../../redux/contactsSlice';

export const handleChange = (e, dispatch, setName, setPhone, setFilter) => {
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
      console.error('Unhandled input name:', name);
      break;
  }
};

export const handleSubmit = async (
  e,
  name,
  phone,
  contacts,
  dispatch,
  setName,
  setPhone,
  setFilter,
  alert
) => {
  e.preventDefault();

  if (name.trim() === '' || phone.trim() === '') {
    alert('Please fill in both name and phone number.');
    return;
  }

  const isDuplicate = contacts.some(
    contact =>
      contact.name.toLowerCase() === name.toLowerCase() ||
      contact.phone === phone
  );

  if (isDuplicate) {
    alert('This name or phone number already exists in your contact list.');
    return;
  }

  const newContact = {
    id: nanoid(),
    name,
    phone,
  };

  try {
    dispatch(addContact(newContact));

    setName('');
    setPhone('');
    setFilter('');
  } catch (error) {
    console.error('Error adding contact:', error.message);
    alert('Error adding contact. Please try again.');
  }
};

export const handleFilterChange = (e, dispatch) => {
  dispatch(setFilter(e.target.value));
};

export const filterContacts = (contacts, filter) => {
  return contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );
};

export const handleDelete = async (
  id,
  dispatch,
  filteredContacts,
  setContacts
) => {
  try {
    await dispatch(deleteContact(id));

    const updatedContacts = filteredContacts.filter(
      contact => contact.id !== id
    );
    dispatch(setContacts(updatedContacts));
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    alert('Error deleting contact. Please try again.');
  }
};
