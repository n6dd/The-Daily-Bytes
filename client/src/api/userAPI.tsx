import Auth from '../utils/auth';
// TODO: Import Auth utility for secure token access
// NOTE: `Auth.getToken()` retrieves the stored JWT for protected routes

// ==============================
// TODO: Fetch all user data from /api/users
// ==============================
const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    const data = await response.json();

    // NOTE: Check for success AFTER parsing to expose error message if needed
    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };
// NOTE: Used to load user data on dashboards or admin pages
