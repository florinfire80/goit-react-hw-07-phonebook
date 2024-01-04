import React from 'react';

const ContactForm = ({ name, phone, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contact name:
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <label>
        Phone number:
        <input type="tel" name="number" value={phone} onChange={handleChange} />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
