CREATE TABLE IF NOT EXISTS topics (
id SERIAL PRIMARY KEY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (255)
    email VARCHAR (255),
    password_hash VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES topics (id)
    answer_text VARCHAR(255)
    is_correct BOOLEAN
);

CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id)
    answer_text VARCHAR(255),
    is_correct BOOLEAN
);

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id)
    topic_id INT REFERENCES topics(id),
    score INT,
    date_taken DATE
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

