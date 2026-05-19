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
// Insert questions (mix of types)
INSERT INTO questions (topic_id, question_text, question_type) VALUES
(1, 'What were the tombs of Egyptian pharaohs called?', 'multiple_choice'),
(1, 'The Nile flows through Ancient Egypt', 'true_false'),
(1, 'Name the Egyptian god of the dead', 'input'),
(1, 'What system of writing did Ancient Egyptians use?', 'multiple_choice'),
(2, 'Who was the king of the Greek gods?', 'multiple_choice'),
(2, 'The first Olympics were held in Athens', 'true_false'),
(2, 'Name the famous temple on the Acropolis', 'input');

// Insert answers (multiple choice and true/false only, input marked separately)
INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(1, 'Pyramids', true), (1, 'Temples', false), (1, 'Ziggurats', false), (1, 'Catacombs', false),
(2, 'True', true), (2, 'False', false),
(3, 'Anubis', true),
(4, 'Hieroglyphics', true), (4, 'Latin', false), (4, 'Cuneiform', false), (4, 'Sanskrit', false),
(5, 'Zeus', true), (5, 'Poseidon', false), (5, 'Apollo', false), (5, 'Hades', false),
(6, 'True', false), (6, 'False', true),
(7, 'The Parthenon', true);