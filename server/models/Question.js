// const db = require('../database/db');

// class Question {
//   constructor({ id, subject_id, question_text, difficulty, created_by }) {
//     this.id = id;
//     this.subject_id = subject_id;
//     this.question_text = question_text;
//     this.difficulty = difficulty;
//     this.created_by = created_by;
//   }

//   static async getBySubject(subjectId, limit = 10) {
//     const response = await db.query(
//       'SELECT * FROM questions WHERE subject_id = $1 ORDER BY RANDOM() LIMIT $2;',
//       [subjectId, limit]
//     );

//     if (response.rows.length === 0) {
//       throw new Error('No questions available for this subject.');
//     }

//     return response.rows.map(q => new Question(q));
//   }

//   static async create(subjectId, questionText, difficulty, createdBy) {
//     const response = await db.query(
//       'INSERT INTO questions (subject_id, question_text, difficulty, created_by) VALUES ($1, $2, $3, $4) RETURNING *;',
//       [subjectId, questionText, difficulty, createdBy]
//     );

//     return new Question(response.rows[0]);
//   }

//   static async deleteById(id) {
//     const response = await db.query(
//       'DELETE FROM questions WHERE id = $1 RETURNING *;',
//       [id]
//     );

//     if (response.rows.length != 1) {
//       throw new Error('Unable to delete question.');
//     }

//     return new Question(response.rows[0]);
//   }
// }

// module.exports = Question;
