import React, { useState } from 'react';
import { auth } from '../../common/firebaseConfig';
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignInWithEmailForm = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Performing input validation
    setErrors({
      ...errors,
      [name]: value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.` : ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Performing form validation
    const formErrors = {};
    for (const key in formData) {
      formErrors[key] = formData[key].trim() === '' ? `${key.charAt(0).toUpperCase() + key.slice(1)} is required.` : '';
    }

    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => error === '')) {
     const { email,password} = formData;
     try{
        const userCredential = signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("email", email);
        console.log('User Signed in successfully:', user);
        navigate("/listrestaurants");

     }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:',errorCode, errorMessage);
    }
    }};

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
      try{
        const provider = new GoogleAuthProvider();
        const result=await signInWithPopup(auth, provider);
        localStorage.setItem("email", result.user.email);
        // User signed in with Google
        console.log('User signed in with Google',result.user);
        navigate("/listrestaurants");
    }
    catch (error) {
        // Handle sign-in with Google error
        console.error('Error signing in with Google:', error);
      }
  };
  

  return (
    <div className="App">
    <div className="signin-form">
      <h2>Customer Sign In</h2>
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
        <button type="submit">Sign in with email</button>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </form>
    </div></div>
  );
};

export default SignInWithEmailForm;
