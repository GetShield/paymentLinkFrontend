import React, { useState, useContext } from 'react';
import { useToken } from '../providers/AuthContext';
import { loginUser } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState(null);
  const { login, } = useToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      login(data);
      navigate('/payment-link');
      console.log('User logged in successfully:', data);
    } catch (error) {
      setError('Error logging in user');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;