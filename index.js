// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");
const db = require("./lib/db");
const createTable = require("./lib/createTable");

// ================================================= //
//               ---- QUESTION BANKS ----            //
// ================================================= //
const main_menu = [
  {
    type: "list",
    name: "main_menu",
    message: "What would you like to do? ",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

const addDepartmentPrompt = [
  {
    type: "input",
    name: "department_name",
    message: "What is the name of the new department?",
  },
];

const addEmployeePrompt = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name? ",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name? ",
  },
  {
    type: "list",
    name: "employee_role",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Legal Team Associate",
    ],
  },
];

const addRolePrompt = [
  {
    type: "input",
    name: "new_role",
    message: "What is the name of the new role? ",
  },
  {
    type: "input",
    name: "salary",
    message:
      "What is the salary for this role? (DO NOT insert commas or any currency symbols) ",
  },
  {
    type: "list",
    name: "department",
    message: "Which department does this role belong to? ",
    choices: ["Engineering", "Finance", "Legal", "Sales"],
  },
  {
    type: "list",
    name: "manager",
    message: "Who is the employee's manager? ",
    choices: ["Engineering", "Finance", "Legal", "Sales"],
  },
];

const updateEmployeePrompt = [
  {
    type: "list",
    name: "update_employee",
    message: "Choose the employee below you would like to update: ",
    choices: ["Jane Doe", "John Doe", "John Smith"],
  },
  {
    type: "list",
    name: "update_role",
    message: "Which role do you want to assign to the selected employee? ",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Legal Team Associate",
    ],
  },
];

function init() {
  inquirer
    .prompt(main_menu)
    .then((main_menu_answer) => nextStep(main_menu_answer));
}

init();

function nextStep(main_menu_answer) {
  let reply;
  switch (main_menu_answer.main_menu) {
    case "View All Employees":
      viewAllEmployees();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    case "View All Departments":
      viewAllDepartments();
      break;
    case "Add Department":
      inquirer
        .prompt(addDepartmentPrompt)
        .then((new_department_answer) => addDepartment(new_department_answer));
      break;
    case "Add Employee":
      inquirer
        .prompt(addEmployeePrompt)
        .then((new_employee_answers) => addEmployee(new_employee_answers));
      break;
    case "Add Role":
      inquirer
        .prompt(addRolePrompt)
        .then((new_role_answers) => addRole(new_role_answers));
      break;
    case "Update Employee Role":
      inquirer
        .prompt(updateEmployeePrompt)
        .then((update_employee_answers) =>
          updateEmployee(update_employee_answers)
        );
  }
}

function viewAllDepartments() {
  let queryStatement = `SELECT * FROM departments`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      let option = "dept";
      createTable(rows, option);
    })
    .catch(console.log)
    .then(() => db.end());
}

function addDepartment(new_department_answer) {
  let queryStatement = `INSERT INTO departments (name) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      return rows;
    })
    .catch(console.log)
    .then(() => db.end());
}

function viewAllEmployees() {
  let queryStatement = `SELECT * FROM employees`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      let option = "empl";
      createTable(rows, option);
    })
    .catch(console.log)
    .then(() => db.end());
}

function addEmployee() {
  let queryStatement = `INSERT INTO employee (first_name, last_name, role_id ) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      return rows;
    })
    .catch(console.log)
    .then(() => db.end());

  console.log(`Added first name last name to the database`);
}
// fix
function updateEmployee() {
  let queryStatement = `UPDATE employee (first_name, last_name, role_id ) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      return rows;
    })
    .catch(console.log)
    .then(() => db.end());

  console.log(`Updated employee's role`);
}

function viewAllRoles() {
  let queryStatement = `SELECT * FROM roles`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      let option = "role";
      createTable(rows, option);
    })
    .then(() => db.end());
}

//fix
function addRole() {
  let queryStatement = `INSERT INTO role (title, salary, deptartment_id ) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      return rows;
    })
    .catch(console.log)
    .then(() => db.end());
}

function addSalary() {}

//Bonus

// add employee managers

// view employees by manager

// view employees by department

// functionality to delete depts, roles, and employees

// functionality to view total utilized budget of dept - combined salaries of employees in dept
