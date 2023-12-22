import React from 'react';

const ContactItem = ({ id, name, phone, onDelete }) => (
  <li>
    <strong>{name}</strong>: {phone}
    <button onClick={() => onDelete(id)}>Delete</button>
  </li>
);

export default ContactItem;