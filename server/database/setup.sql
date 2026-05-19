CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'student',
    total_xp INT DEFAULT 0,
    level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subjects(id),
    question_text VARCHAR(255) NOT NULL,
    difficulty VARCHAR(10) DEFAULT 'medium',
    created_by INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS options (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS game_sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    subject_id INT REFERENCES subjects(id),
    score INT NOT NULL,
    xp_earned INT NOT NULL
);
