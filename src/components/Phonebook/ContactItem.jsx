import React from 'react';

const ContactItem = ({ id, name, number, onDelete }) => (
  <li>
    <strong>{name}</strong>: {number}
    <button onClick={() => onDelete(id)}>Delete</button>
  </li>
);

export default ContactItem;
