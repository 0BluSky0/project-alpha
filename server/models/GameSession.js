const db = require('../database/db');

class GameSession {
  constructor({ id, user_id, subject_id, score, xp_earned }) {
    this.id = id;
    this.user_id = user_id;
    this.subject_id = subject_id;
    this.score = score;
    this.xp_earned = xp_earned;
  }

  static async create(userId, subjectId, score, xpEarned) {
    const response = await db.query(
      'INSERT INTO game_sessions (user_id, subject_id, score, xp_earned) VALUES ($1, $2, $3, $4) RETURNING *;',
      [userId, subjectId, score, xpEarned]
    );

    if (response.rows.length === 0) {
      throw new Error('Game session could not be created.');
    }
    return new GameSession(response.rows[0]);
  }

  static async getByUser(userId, limit = 10) {
    const response = await db.query(
      'SELECT * FROM game_sessions WHERE user_id = $1 ORDER BY id DESC LIMIT $2;',
      [userId, limit]
    );

    return response.rows.map(g => new GameSession(g));
  }
}

module.exports = GameSession;
