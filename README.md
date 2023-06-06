# EMS - Employee Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description:

This work is an introduction to databases and management systems that have been created to handle data. A relational database is a type of database management system that stores data in tables with columns and points that are related to each other. This is the basis for modern database systems like MySQL which utilize the Structured Query Language (SQL) to perform CRUD operations. CRUD (Create, Read, Update, Delete) describes the four basic functions of the modern web application.

This Employee Management System (EMS) uses Inquirer to allow the user to enter employee data as well as information about their salaries, departments, and roles within the company.

This is a WIP! Follow my progress below:

![Screenshot 2023-06-06 at 4 02 37 PM](https://github.com/myrojoylee/employee-management-system-ems-mjlee/assets/120980593/85bfeefa-0cd3-4021-924b-f11a202462e3)


- [x] GIVEN a command-line application that accepts user input
- [x] WHEN I start the application
- [x] THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- [x] WHEN I choose to view all departments
- [x] THEN I am presented with a formatted table showing department names and department ids
- [x] WHEN I choose to view all roles
- [x] THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- [x] WHEN I choose to view all employees
- [x] THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- [x] WHEN I choose to add a department
- [x] THEN I am prompted to enter the name of the department and that department is added to the database
- [x] WHEN I choose to add a role
- [x] THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- [x] WHEN I choose to add an employee
- [x] THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- [x] WHEN I choose to update an employee role
- [x] THEN I am prompted to select an employee to update and their new role and this information is updated in the database

Bonus/extras:

- [ ] Can update employee managers
- [ ] Can view employees by manager
- [ ] Can view employees by department
- [ ] Can delete departments, roles, and employees
- [ ] Can view the combined salaries of all employees by department.

## Installation:

- MySQL is required for this app to run, so follow directions outlined [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) for a step-by-step guide depending on your operating system.
- This is a [Node.js](https://nodejs.org/en) application. It is recommended to use at least v16 (up to v18) for this app to run correctly.
- [Inquirer v8.2.4](https://www.npmjs.com/package/inquirer) is needed and can be installed via npm. Once in your project folder, type the following in your terminal: `npm i inquirer@8.2.4`.
- [MySQL2](https://www.npmjs.com/package/mysql2) is needed to connect the app to the MySQL database. Once in your project folder, type the following in your terminal: `npm i mysql2`.

## Usage:

- Navigate to `index.js`. Type in `node index` in the terminal once in the project directory and answer the prompts. The video below shows the full functionality of the app by showing the menus and different tables based on responses to each prompt.

## Sources/Credits:

- Information about relational databases was sourced from [Oracle](https://www.oracle.com/database/what-is-a-relational-database/#:~:text=A%20relational%20database%20is%20a,of%20representing%20data%20in%20tables.).

- More information about MySQL can be found in the docs [here](https://dev.mysql.com/doc/).

## License:

- Refer to the license in the repository.
