DROP TABLE IF EXISTS laws;
CREATE TABLE laws (
    id INT AUTO_INCREMENT PRIMARY KEY,
    law_name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO laws (law_name) VALUES ('IPC');
INSERT INTO laws (law_name) VALUES ('Criminal Procedure Code');

DROP TABLE IF EXISTS chapters;
CREATE TABLE chapters (
law_id INT,
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_number INT NOT NULL,
    chapter_title VARCHAR(255) NOT NULL,
    UNIQUE(chapter_number)
);

-- Chapters for law_id = 1 (IPC)
INSERT INTO chapters (law_id, chapter_number, chapter_title) VALUES
(1, 1, 'introduction'),
(1, 2, 'general explanations'),
(1, 3, 'punishments'),
(1, 4, 'general exceptions'),
(1, 5, 'abetment'),
(1, 6, 'offences against the state'),
(1, 7, 'offences relating to the army, navy and air force'),
(1, 8, 'offences against the public tranquillity'),
(1, 9, 'offences by or relating to public servants'),
(1, 10, 'contempt''s  the lawful authority  public servants'),
(1, 11, 'false evidence and offences against public justice'),
(1, 12, 'offences relating to coin and government stamps'),
(1, 13, 'offences relating to weights and measures'),
(1, 14, 'offences affecting the public health, safety, convenience, decency and morals'),
(1, 15, 'offences relating to religion'),
(1, 16, 'offences affecting the human body'),
(1, 17, 'offences against property  theft'),
(1, 18, 'offences relating to documents and to property marks'),
(1, 19, 'the criminal breach  contracts  service'),
(1, 20, 'offences relating to marriage'),
(1, 21, 'defamation'),
(1, 22, 'criminal intimidation, insult and annoyance'),
(1, 23, 'attempts  commit offences');

-- Chapters for law_id = 3 (CrPC, reinserted)
INSERT INTO chapters (law_id, chapter_number, chapter_title) VALUES
(3, 1, 'Preliminary'),
(3, 2, 'The Constitution of Criminal Courts and Offices'),
(3, 3, 'Power of Courts'),
(3, 4, 'A.—Powers of superior officers of police'),
(3, 5, 'Arrest of persons'),
(3, 6, 'Processes to compel appearance'),
(3, 7, 'Processes to compel the production of things'),
(3, 8, 'Reciprocal arrangements for assistance in certain matters and procedure for attachment and forfeiture of property'),
(3, 9, 'Security for keeping the peace and for good behaviour'),
(3, 10, 'Maintenance of public order and tranquillity'),
(3, 11, 'Preventive action of the police'),
(3, 12, 'Information to the police and their powers to investigate'),
(3, 13, 'Jurisdiction of the criminal courts in inquiries and trials'),
(3, 14, 'Conditions requisite for initiation of proceedings'),
(3, 15, 'Complaints to Magistrates'),
(3, 16, 'Commencement of proceedings before Magistrates'),
(3, 17, 'The Charge'),
(3, 18, 'Trial before a Court of Session'),
(3, 19, 'Trial of warrant-cases by Magistrates'),
(3, 20, 'Trial of summons-cases by Magistrates'),
(3, 21, 'Summary Trials'),
(3, 22, 'Judgment'),
(3, 23, 'Submission of death sentences for confirmation'),
(3, 24, 'Execution, suspension, remission and commutation of sentences'),
(3, 25, 'Provisions as to bail and bonds'),
(3, 26, 'Directions of the nature of habeas corpus'),
(3, 27, 'Irregular proceedings'),
(3, 29, 'Limitation for taking cognizance of certain offences'),
(3, 30, 'Miscellaneous'),
(3, 31, 'Transitory provisions'),
(3, 32, 'Repeal and savings'),
(3, 34, 'Schedule I – Classification of Offences'),
(3, 35, 'Schedule II – Tabular Statement of Offences'),
(3, 36, 'Schedule III – Forms');



DROP TABLE IF EXISTS sections;
CREATE TABLE sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT,
    section_number VARCHAR(10), -- e.g. "29A"
    section_title VARCHAR(500),
    section_desc TEXT,
source varchar(20),
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS chat_sessions;
CREATE TABLE IF NOT EXISTS chat_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS chat_messages;
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id)
);