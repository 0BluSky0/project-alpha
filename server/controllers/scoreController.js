const User = require('../models/User');
const GameSession = require('../models/GameSession');

async function getLeaderboard(req, res) {
    try {
        const users = await User.getTopByXP();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDashboard(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const sessions = await GameSession.getByUser(userId);
        res.status(200).json({ user, sessions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getLeaderboard, getDashboard };