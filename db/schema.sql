DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(40) NULL,
    devoured BOOLEAN NOT NULL,
    primary key (id)
);

SELECT * FROM burgers;