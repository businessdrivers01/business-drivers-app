import axios from 'axios';

const getActiveFreelancers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/freelancer/active`);
    return response.data; // Return the freelancers data
  } catch (error) {
    console.error('Error fetching inactive freelancers:', error);
    throw error; // Optionally, re-throw the error to handle it in the component
  }
};

export default getActiveFreelancers;
