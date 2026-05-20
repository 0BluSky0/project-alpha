const db = require('../database/db');

class User {
  constructor({ id, username, email, password_hash, role, total_xp, level, colour_scheme, created_at }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.total_xp = total_xp;
    this.level = level;
    this.colour_scheme = colour_scheme;
    this.created_at = created_at;
  }

  static async create(username, email, hashedPassword) {
    try {
      
      const response = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *;',
        [username, email, hashedPassword]
      )

      if(response.rows.length === 0) {
        throw new Error('User could not be created.')
      }
      return new User(response.rows[0]);

    } catch (error) {
      throw new Error(error.message)
    }

  }

  static async findByEmail(email) {
    const response = await db.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async findById(id) {
    const response = await db.query(
      'SELECT * FROM users WHERE id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async addXP(userId, xpToAdd) {
    const response = await db.query(
      `UPDATE users
       SET total_xp = total_xp + $2,
           level = CASE
             WHEN total_xp + $2 >= 500 THEN 5
             WHEN total_xp + $2 >= 300 THEN 4
             WHEN total_xp + $2 >= 150 THEN 3
             WHEN total_xp + $2 >= 50  THEN 2
             ELSE 1
           END
       WHERE id = $1
       RETURNING *;`,
      [userId, xpToAdd]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update XP.');
    }
    return new User(response.rows[0]);
  }

  static async updateColourScheme(userId, colourScheme) {
    const response = await db.query(
      'UPDATE users SET colour_scheme = $2 WHERE id = $1 RETURNING *;',
      [userId, colourScheme]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update colour scheme.');
    }
    return new User(response.rows[0]);
  }

  static async getTopByXP(limit = 10) {
    const response = await db.query(
      'SELECT id, username, total_xp, level FROM users ORDER BY total_xp DESC LIMIT $1;',
      [limit]
    );
    return response.rows.map(u => new User(u));
  }
}

module.exports = User;
