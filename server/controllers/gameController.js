const Question = require('../models/question');
const Option = require('../models/option');
const GameSession = require('../models/gameSession');
const User = require('../models/user');

async function getQuestions(req, res) {
    try {
        const subjectId = parseInt(req.params.subjectId);
        const questions = await Question.getBySubject(subjectId);
        res.status(200).json(questions);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function submitQuiz(req, res) {
    try {
        const { subjectId, score, xpEarned } = req.body;
        const userId = req.user.id;

        const session = await GameSession.create(userId, subjectId, score, xpEarned);
        await User.addXP(userId, xpEarned);

        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getQuestions, submitQuiz };
