import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { signUp } from "../api/authAPI";  // Import the signUp function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserSignUp

const SignUp = () => {
  // State to manage the signUp form data
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: '',
    password: '',
    email: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  // Handle form submission for signUp
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the signUp API endpoint with signUpData
      const data = await signUp(signUpData);
      // If signUp is successful, call Auth.signUp to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to signUp', err);  // Log any errors that occur during signUp
    }
  };

  return (
    <div className='form-container'>
      <form className='form signUp-form' onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='email'
            name='email'
            value={signUpData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={signUpData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the signUp form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>SignUp</button>
        </div>
      </form>
    </div>
  )
};

export default SignUp;