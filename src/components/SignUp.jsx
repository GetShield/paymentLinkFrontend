import React, { useState } from 'react';
import { registerUser } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../providers/AuthContext';
const SignUp = () => {
    const { login, } = useToken();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        url: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            login(data);
            navigate('/payment-link');
            console.log('User registered successfully:', data);
            // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <div className="text-center pt-2">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="col-md-4 col-md-offset-4 section-title row">
                <div className='form-group'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange} />
                </div>
                <div className='form-group'>

                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={formData.description} required onChange={handleChange} />
                </div>
                <div className='form-group'>

                    <label htmlFor="image">Image:</label>
                    <input type="text" id="image" name="image" value={formData.image} required onChange={handleChange} />
                </div>
                <div className='form-group'>

                    <label htmlFor="url">URL:</label>
                    <input type="text" id="url" name="url" value={formData.url} required onChange={handleChange} />
                </div>
                <div className='form-group'>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} />
                </div>
                <button type="submit">Sign Up</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
