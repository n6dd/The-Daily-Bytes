import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';                              // ✅ Auth utility
import { login } from "../api/authAPI";                        // ✅ Points to client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";           // ✅ Points to client/src/interfaces/UserLogin.tsx

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(loginData); // Sends to /api/auth/login
      if (data?.token) {
        Auth.login(data.token);            // Save token in localStorage
      } else {
        console.error("No token received.");
      }
    } catch (err) {
      console.error('Failed to login', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username ?? ''}
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
            value={loginData.password ?? ''}
            onChange={handleChange}
            required
          />
        </div>

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
