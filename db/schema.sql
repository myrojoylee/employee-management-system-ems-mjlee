DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE departments (
    id INT NOT NULL, 
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    department INT NOT NULL,
    salary DECIMAL,
    PRIMARY KEY (id),
    FOREIGN KEY (department)
        REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title INT NOT NULL,
    manager INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (title)
        REFERENCES roles(id)
);

DESCRIBE departments;
DESCRIBE roles;
DESCRIBE employees;