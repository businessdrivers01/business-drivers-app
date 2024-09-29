import axios from 'axios';

const getInactiveCompanies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/company/inactive`);
    // console.log(response.data);
    return response.data; // Return the companies data
  } catch (error) {
    console.error('Error fetching inactive companies:', error);
    throw error; // Optionally, re-throw the error to handle it in the component
  }
};

export default getInactiveCompanies;
