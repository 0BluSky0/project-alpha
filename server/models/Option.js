const db = require('../database/db');

class Option {
  constructor({ id, question_id, option_text, is_correct }) {
    this.id = id;
    this.question_id = question_id;
    this.option_text = option_text;
    this.is_correct = is_correct;
  }

  static async getByQuestion(questionId) {
    const response = await db.query(
      'SELECT * FROM options WHERE question_id = $1;',
      [questionId]
    );

    if (response.rows.length === 0) {
      throw new Error('No options available for this question.');
    }

    return response.rows.map(o => new Option(o));
  }
}

module.exports = Option;
