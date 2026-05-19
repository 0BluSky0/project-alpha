const db = require('../database/db');

class Subject {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM subjects;');

    if (response.rows.length === 0) {
      throw new Error('No subjects available.');
    }

    return response.rows.map(s => new Subject(s));
  }

  static async findById(id) {
    const response = await db.query('SELECT * FROM subjects WHERE id = $1;', [id]);

    if (response.rows.length != 1) {
      throw new Error('Unable to locate subject.');
    }

    return new Subject(response.rows[0]);
  }
}

module.exports = Subject;
