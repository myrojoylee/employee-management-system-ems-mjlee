INSERT INTO departments (id, name)
VALUES (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal"),
    (1, "Sales");

INSERT INTO roles (title, department, salary)
VALUES ("Sales Lead", 001, "100000"), ("Salesperson", 001, "80000"), ("Lead Engineer", 002, "150000"),("Software Engineer", 002, "120000"),("Account Manager", 003, "160000"),("Accountant", 003, "125000"),("Legal Team Lead", 004, "250000"),("Lawyer", 004, "190000");

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES ("Buzz", "Lightyear", 1, NULL),("Mickey", "Mouse", 2, 1),("QueenOf", "Hearts", 3, NULL),("Minnie", "Mouse", 4, 3),("Pluto", "Planet", 5, NULL),("Snow", "White", 6, 5),("Cruella", "de Vil", 7, NULL),("Randall", "Boggs", 8, 7)