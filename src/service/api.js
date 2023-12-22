// service/api.js

const BASE_URL = 'https://658467c94d1ee97c6bcfadd0.mockapi.io';

// Funcție pentru obținerea contactelor
export const fetchContactsApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};

// Funcție pentru adăugarea unui contact
export const addContactApi = async contactData => {
  try {
    console.log('Sending request to add contact:', contactData);

    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    console.log('Response from add contact:', data);

    return data;
  } catch (error) {
    throw new Error('Failed to add contact');
  }
};

// Function for editing a contact
export const editContactApi = async (contactId, contactData) => {
  try {
    console.log('Sending request to edit contact:', contactId, contactData);

    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'PATCH', // Use PATCH instead of PUT for updating specific fields
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    console.log('Response from edit contact:', data);

    return data;
  } catch (error) {
    throw new Error('Failed to edit contact');
  }
};

// Funcție pentru ștergerea unui contact
export const deleteContactApi = async contactId => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }

    return contactId;
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
};
