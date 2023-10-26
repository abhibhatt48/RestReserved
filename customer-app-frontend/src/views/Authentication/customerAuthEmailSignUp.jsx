import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { auth } from '../../common/firebaseConfig';
import { Link } from 'react-router-dom';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    contact: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validating the input fields
    setErrors({
      ...errors,
      [name]: value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.` : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validating form before submission
    const formErrors = {};
    for (const key in formData) {
      formErrors[key] = formData[key].trim() === '' ? `${key.charAt(0).toUpperCase() + key.slice(1)} is required.` : '';
    }

    setErrors(formErrors);

    // Checking if there are no errors before proceeding with signup logic
    if (Object.values(formErrors).every((error) => error === '')) {
      const { email,password,firstName,lastName,contact} = formData;
      try {
        // Creating user with email and password using Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User created successfully
        const user = userCredential.user;
        //sending user data to the database after successful sign up with Firebase Authentiction
        if(user)
        {
          try {
            const response = await axios.post('https://brene180q1.execute-api.us-east-1.amazonaws.com/dev/customer-sign-up', {
              "email_id":email,
              "first_name":firstName,
              "last_name":lastName,
              "contact_number":contact,
            });
             console.log('API Response:', response.data);
          } catch (error) {
            console.error('Error calling API:', error);
          }
        }
        console.log('User created successfully:', user);
        console.log('User created successfully');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:',errorCode, errorMessage);
      }
    }
  };

  return (
    <div className="signup-form">
      <h2>Customer Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="error-message">{errors.email}</span>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="error-message">{errors.password}</span>
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <span className="error-message">{errors.firstName}</span>
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <span className="error-message">{errors.lastName}</span>
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />
          <span className="error-message">{errors.contact}</span>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="signin-section">
        <Link to="/signin">
          <button>Already have an account?</button>
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
