import React from 'react';
import axios from 'axios';
import AddUserForm from '../../components/RegistrationForm';

export default function index({ allCities }) {
  const handleAddUserFormData = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/add-user',
        userData
      );
      console.log(response.data, response.status);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.msg); // Handle the specific error message for 400 status
      } else {
        console.log('An error occurred:', error.message); // Handle other types of errors
      }
    }
  };

  return (
    <AddUserForm
      formData={handleAddUserFormData}
      allCities={allCities.cities}
    />
  );
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:5000/all-cities');

  const allCities = res.data;
  return {
    props: {
      allCities,
    },
  };
}
