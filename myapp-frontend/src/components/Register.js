import axios from 'axios';
import React, { useState } from 'react';
import Login from './Login'; // Import the Login component
import './Register.css'; // Import the CSS file

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [showLogin, setShowLogin] = useState(false); // State to toggle forms

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.message);

            // ✅ Clear input fields after successful registration
            setFormData({ username: '', email: '', password: '' });
        } catch (error) {
            console.error(error);
        }
    };

    // Toggle function
    if (showLogin) {
        return <Login switchToRegister={() => setShowLogin(false)} />;
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username} // Bind value to state
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email} // Bind value to state
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password} // Bind value to state
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-text">
                    Already have an account? <button onClick={() => setShowLogin(true)} className="switch-button">Login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
