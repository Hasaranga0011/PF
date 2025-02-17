const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/User');

// Register Controller
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, email, hashedPassword);
        res.send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Server error during registration.' });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required!' });
    }

    try {
        const user = await getUserByEmail(email);

        if (user.length > 0) {
            const isMatch = await bcrypt.compare(password, user[0].password);

            if (isMatch) {
                const token = jwt.sign({ id: user[0].id }, 'secretkey', { expiresIn: '1h' });
                res.send({ message: 'Login successful!', token });
            } else {
                res.status(400).send({ message: 'Invalid credentials!' });
            }
        } else {
            res.status(400).send({ message: 'User not found!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error during login.' });
    }
};

module.exports = { registerUser, loginUser };
