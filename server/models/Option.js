// const db = require('../database/db');

// class Option {
//   constructor({ id, question_id, option_text, is_correct }) {
//     this.id = id;
//     this.question_id = question_id;
//     this.option_text = option_text;
//     this.is_correct = is_correct;
//   }

//   static async create(questionId, optionText, isCorrect) {
//     const response = await db.query(
//       'INSERT INTO options (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *;',
//       [questionId, optionText, isCorrect]
//     );

//     return new Option(response.rows[0]);
//   }
// }

// module.exports = Option;
