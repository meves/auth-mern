CREATE TABLE IF NOT EXISTS link (
    id INT PRIMARY KEY AUTO_INCREMENT,
    where_from VARCHAR(100) NOT NULL,
    where_to VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    data DATETIME DEFAULT NOW(),
    clicks INT UNSIGNED DEFAULT 0,
    owner INT,
    INDEX owner_index(owner),
    FOREIGN KEY (owner)
        REFERENCES user(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS link;

INSERT INTO link (where_from, where_to, code, clicks, owner)
VALUES ("https://google.com", "https://yandex.ru", 'GOOGLE_YANDEX', 10, 1);

SELECT * FROM link
WHERE owner = 1;

SELECT  * FROM link WHERE id = 1;

SELECT where_from FROM link WHERE code = 'GOOGLE_YANDEX';