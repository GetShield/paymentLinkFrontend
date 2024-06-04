const API_URL = process.env.REACT_APP_NODE_URL; // Asegúrate de que esta URL es correcta

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Error in user registration');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Error in user login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const fetchWithAuth = async (endpoint, token, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'x-auth-token': `${token}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        // throw new Error('Network response was not ok');
    }

    return await response.json();
};
export const fetchApi = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        // throw new Error('Network response was not ok');
    }

    return await response.json();
};
