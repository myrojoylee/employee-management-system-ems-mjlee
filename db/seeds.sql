INSERT INTO departments (id, name)
VALUES (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal"),
    (1, "Sales");

INSERT INTO roles (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000), 
("Salesperson", 1, 80000), 
("Lead Engineer", 2, 150000),
("Software Engineer", 2, 120000),
("Account Manager", 3, 160000),
("Accountant", 3, 125000),
("Legal Team Lead", 4, 250000),
("Lawyer", 4, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Buzz", "Lightyear", 1, null),
("Mickey", "Mouse", 2, 1),
("QueenOf", "Hearts", 3, null),
("Minnie", "Mouse", 4, 3),
("Pluto", "Planet", 5, null),
("Snow", "White", 6, 5),
("Cruella", "de Vil", 7, null),
("Randall", "Boggs", 8, 7);