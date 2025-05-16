import { UserLogin } from "../interfaces/UserLogin";  
// TODO: Import user interface for login data shape
// NOTE: This enforces type safety for `userInfo` passed into auth requests

// ==============================
// TODO: Handle user login via POST request to /auth/login
// ==============================
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

// ==============================
// TODO: Handle user registration via POST request to /auth/register
// ==============================
const signUp = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from user signup: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login, signUp };
// NOTE: These functions are used in Login and Signup components
