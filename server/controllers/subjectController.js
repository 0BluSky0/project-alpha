const Subject = require('../models/Subject');

async function getAll(req, res) {
    try {
        const subjects = await Subject.getAll();
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAll };