import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // State to manage loading state during login
  const [loading, setLoading] = useState(false);

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    try {
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      setLoading(false); // Reset loading to false if login fails
      console.error('Failed to login', err);  // Log any errors that occur during login
    } finally {
      setLoading(false); // Set loading to false when login completes
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username || ''}
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
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
<button
  type="submit"
  disabled={loading}
  className={`login-button ${loading ? 'loading' : ''}`}
>
  {loading ? (
    <>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
      Signing in...
    </>
  ) : (
    'Sign in'
  )}
</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
