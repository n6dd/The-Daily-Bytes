import { UserLogin } from "../interfaces/UserLogin";  
// TODO: Import user interface for login data shape
// NOTE This enforces type safety for `userInfo` passed into auth requests

// TODO: Handle user login via POST request to /auth/login
const login = async (userInfo: UserLogin) => {
  try {
    // NOTE Use `fetch` with method 'POST' and proper headers for JSON
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // NOTE Check for non-OK HTTP response status (not 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // NOTE Parse JSON from response and return to caller
    const data = await response.json();
    return data;
  } catch (err) {
    // TODO: Improve error logging if needed
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

// TODO: Handle user registration via POST request to /auth/register
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
    // TODO: Standardize error messages and consider user-facing alert
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login, signUp };  
// NOTE These functions will be used in user login/signup forms or hooks
