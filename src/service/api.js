const BASE_URL = 'https://658467c94d1ee97c6bcfadd0.mockapi.io/contacts';

export const fetchContacts = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    throw error;
  }
};

export const addContact = async contact => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contact:', error.message);
    throw error;
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await fetch(`${BASE_URL}/${contactId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    throw error;
  }
};
