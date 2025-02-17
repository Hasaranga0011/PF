import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Reuse the same CSS file

const Login = ({ switchToRegister }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(''); // State to store the error message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            alert(res.data.message);

            // Clear form fields after successful login
            setFormData({ email: '', password: '' });
            setErrorMessage(''); // Reset the error message on successful login
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                // Display the error message from the backend
                setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 lign>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email} // Bind input value to state
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password} // Bind input value to state
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                <p className="login-text">
                    Don't have an account? <button onClick={switchToRegister} className="switch-button">Register</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
