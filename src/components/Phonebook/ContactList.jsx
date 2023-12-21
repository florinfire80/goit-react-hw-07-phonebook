import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete }) => (
  <div>
    <h1>Contacts</h1>
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={onDelete}
        />
      ))}
    </ul>
  </div>
);

export default ContactList;
