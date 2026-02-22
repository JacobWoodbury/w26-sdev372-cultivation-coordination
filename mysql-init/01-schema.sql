-- We can use this later when we decide on everything we are storing in the DB. right now we are using the init-db.
USE plants;

CREATE TABLE IF NOT EXISTS plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL
);
