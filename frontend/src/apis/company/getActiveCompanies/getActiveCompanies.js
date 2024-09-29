import axios from 'axios';

const getActiveCompanies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/company/active`);
    return response.data; // Return the companies data
  } catch (error) {
    console.error('Error fetching inactive companies:', error);
    throw error; // Optionally, re-throw the error to handle it in the component
  }
};

export default getActiveCompanies;
