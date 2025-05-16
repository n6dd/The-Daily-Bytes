import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';               // NOTE: Handles storing token in localStorage
import { signUp } from "../api/authAPI";        // NOTE: Calls backend signup API
import { UserLogin } from "../interfaces/UserLogin";  // NOTE: Type for signup form fields

// ==============================
// TODO: SignUp Component
// ==============================

const SignUp = () => {
  // TODO: Track form values for email, username, password
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: '',
    password: '',
    email: ''
  });

  // TODO: Handle field input updates
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // TODO: Submit signup form to API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp(signUpData);  // NOTE: Sends POST to /auth/register
      Auth.login(data.token);                // NOTE: Stores token and sets auth state
    } catch (err) {
      console.error('Failed to sign up', err);
    }
  };

  // ==============================
  // TODO: Render SignUp Form
  // ==============================

  return (
    <div className='form-container'>
      <form className='form signUp-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        {/* Email Input */}
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='email'
            name='email'
            value={signUpData.email ?? ''}  // ✅ Null-safe
            onChange={handleChange}
          />
        </div>

        {/* Username Input */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={signUpData.username ?? ''}  // ✅ Null-safe
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password ?? ''}  // ✅ Null-safe
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
// NOTE: Registration form → API → token login on success...
