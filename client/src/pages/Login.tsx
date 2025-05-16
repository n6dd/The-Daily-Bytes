import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';                   // NOTE: Handles localStorage auth state
import { login } from "../api/authAPI";             // NOTE: Login API call
import { UserLogin } from "../interfaces/UserLogin"; // NOTE: Login form input interface

// ==============================
// TODO: Login Component
// ==============================

const Login = () => {
  // TODO: Track form input values
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // TODO: Track loading state
  const [loading, setLoading] = useState(false);

  // TODO: Update form values
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // TODO: Submit login form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(loginData);
      Auth.login(data.token);  // NOTE: Save JWT and redirect
    } catch (err) {
      console.error('Failed to login', err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // TODO: Render Login UI
  // ==============================

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Username Input */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username ?? ''}  // ✅ Null-safe value
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
            value={loginData.password ?? ''}  // ✅ Null-safe value
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
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
};

export default Login;
// NOTE Displays login form, handles API login, sets auth token
