const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register(req, res) {
    const data = req.body;

    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data["password_hash"] = await bcrypt.hash(data.password, salt);
        const user = await User.create(data.username, data.email, data["password_hash"]);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    const data = req.body;

    try {
        const user = await User.findByEmail(data.email);

        const match = await bcrypt.compare(data.password, user.password_hash);

        if (match) {
            const payload = { id: user.id, role: user.role };
            const sendToken = (err, token) => {
                if (err) { throw new Error('Error in token generation'); }
                res.status(200).json({ success: true, token: token });
            }
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated');
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updateColourScheme(req, res) {
    try {
        const userId = req.user.id;
        const { colourScheme } = req.body;
        const user = await User.updateColourScheme(userId, colourScheme);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { register, login, updateColourScheme };
