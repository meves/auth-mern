CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL
);

SELECT email, password FROM user
WHERE email = 'meves.sergey@gmail.com' 
OR password = 'mevess';

INSERT INTO user VALUES
(NULL, 'meves.sergey@gmail.com', 'mevess');
INSERT INTO user VALUES
(NULL, 'test@gmail.com', 'test');

SELECT email, password FROM user
WHERE email = 'email' 
OR password = 'pwd';
