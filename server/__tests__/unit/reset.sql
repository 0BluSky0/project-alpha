TRUNCATE users, game_sessions, options, questions, subjects RESTART IDENTITY CASCADE;

INSERT INTO subjects (name) VALUES
('Ancient Egypt'),
('Ancient Greece');

INSERT INTO questions (subject_id, question_text) VALUES
(1, 'What were the tombs of Egyptian pharaohs called?'),
(1, 'The Nile flows through Ancient Egypt'),
(1, 'Name the Egyptian god of the dead'),
(1, 'What system of writing did Ancient Egyptians use?'),
(2, 'Who was the king of the Greek gods?'),
(2, 'The first Olympics were held in Athens'),
(2, 'Name the famous temple on the Acropolis');

INSERT INTO options (question_id, option_text, is_correct) VALUES
(1, 'Pyramids', true), (1, 'Temples', false), (1, 'Ziggurats', false), (1, 'Catacombs', false),
(2, 'True', true), (2, 'False', false),
(3, 'Anubis', true),
(4, 'Hieroglyphics', true), (4, 'Latin', false), (4, 'Cuneiform', false), (4, 'Sanskrit', false),
(5, 'Zeus', true), (5, 'Poseidon', false), (5, 'Apollo', false), (5, 'Hades', false),
(6, 'True', false), (6, 'False', true),
(7, 'The Parthenon', true);