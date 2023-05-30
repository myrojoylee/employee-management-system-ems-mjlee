INSERT INTO departments (name)
VALUES ("Human Resources"),
    ("Marketing"),
    ("Research & Development"),
    ("IT"),
    ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Junior", "60000", 002), ("Intermediate", "80000", 002), ("Senior", "100000", 002);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Jane", "Doe", 001),("John", "Smith", 001)