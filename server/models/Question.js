const db = require('../database/db');

class Question {
  constructor({ id, subject_id, question_text, question_type, difficulty, created_by }) {
    this.id = id;
    this.subject_id = subject_id;
    this.question_text = question_text;
    this.question_type = question_type;
    this.difficulty = difficulty;
    this.created_by = created_by;
  }

  static async getBySubject(subjectId, limit = 10) {
    const response = await db.query(
      'SELECT * FROM questions WHERE subject_id = $1 ORDER BY RANDOM() LIMIT $2;',
      [subjectId, limit]
    );

    if (response.rows.length === 0) {
      throw new Error('No questions available for this subject.');
    }

    return response.rows.map(q => new Question(q));
  }
}

module.exports = Question;
