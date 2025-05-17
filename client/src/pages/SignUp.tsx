import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';                        // ✅ Manages token storage
import { signUp } from "../api/authAPI";                 // ✅ client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";     // ✅ client/src/interfaces/UserLogin.tsx

const SignUp = () => {
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp(signUpData);  // Sends to /api/auth/register
      if (data?.token) {
        Auth.login(data.token);              // Stores token and logs in
      } else {
        console.error("No token returned.");
      }
    } catch (err) {
      console.error('Failed to sign up', err);
    }
  };

  return (
    <div className='form-container'>
      <form className='form signUp-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='email'
            name='email'
            value={signUpData.email ?? ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={signUpData.username ?? ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password ?? ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
