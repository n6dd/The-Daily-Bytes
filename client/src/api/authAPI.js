export const login = async (userData) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!res.ok)
        throw new Error('Login failed');
    return res.json(); // { token: "..." }
};
export const signUp = async (userData) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!res.ok)
        throw new Error('Registration failed');
    return res.json(); // { token: "..." }
};
