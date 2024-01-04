import axios from 'axios';

axios.defaults.baseURL = 'https://658467c94d1ee97c6bcfadd0.mockapi.io/contacts';

async function get() {
  try {
    const response = await axios.get('/');
    return response.data;
  } catch (error) {
    console.error('Error in get function:', error);
    throw error;
  }
}

async function create(contact) {
  try {
    const response = await axios.post('/', contact);
    return response.data;
  } catch (error) {
    console.error('Error in create function:', error);
    throw error;
  }
}

async function remove(contactId) {
  try {
    const response = await axios.delete(`/${contactId}`);
    return response.data;
  } catch (error) {
    console.error('Error in remove function:', error);
    throw error;
  }
}

const contactsService = {
  get,
  create,
  remove,
};

export default contactsService;
