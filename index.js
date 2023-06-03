// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");
const db = require("./lib/db");
const createTable = require("./lib/createTable");

// ================================================= //
//               ---- QUESTION BANKS ----            //
// ================================================= //
let currentDeptList = ["Engineering", "Finance", "Legal", "Sales"];
let currentRoleList = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Legal Team Associate",
];
let currentEmpList = [
  "None",
  "Buzz Lightyear",
  "Mickey Mouse",
  "Queen Of Hearts",
  "Minnie Mouse",
  "Pluto Planet",
  "Snow White",
  "Cruella de Vil",
  "Randall Boggs",
];
const main_menu = [
  {
    type: "list",
    name: "main_menu",
    message: "What would you like to do? (CTRL + C to quit)",
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
    message: "What is this employee's role? ",
    choices: currentRoleList,
  },
  {
    type: "list",
    name: "manager",
    message: "Who is the employee's manager? ",
    choices: currentEmpList,
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
    message: "What is the salary for this role? (example: 100000) ",
  },
  {
    type: "list",
    name: "department",
    message: "Which department does this role belong to? ",
    choices: currentDeptList,
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
    choices: currentEmpList,
  },
  {
    type: "list",
    name: "update_role",
    message: "Which role do you want to assign to the selected employee? ",
    choices: currentRoleList,
  },
];

function init() {
  inquirer
    .prompt(main_menu)
    .then((main_menu_answer) => nextStep(main_menu_answer));
}

init();

function nextStep(main_menu_answer) {
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
    .then(() => init());
}

function addDepartment(new_department_answer) {
  currentDeptList.push(new_department_answer.department_name);
  let queryStatement = `INSERT INTO departments (name) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(
        `Added ${new_department_answer.department_name} to the database.`
      );
      init();
    })
    .catch(console.log)
    .then(() => init());
}

/**
 * JOIN between dept, role, and employee tables
 */
function viewAllEmployees() {
  let queryStatement = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles r ON e.role_id = r.id JOIN departments d ON d.id = r.department_id`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      let option = "empl";
      createTable(rows, option);
    })
    .catch(console.log)
    .then(() => init());
}

function addEmployee(new_employee_answers) {
  let role_id =
    currentRoleList.findIndex(
      (role) => role === new_employee_answers.employee_role
    ) + 1;

  let manager_id;
  new_employee_answers.manager != "None"
    ? (manager_id = currentEmpList.findIndex(
        (emp) => emp === new_employee_answers.manager
      ))
    : (manager_id = "null");

  let queryStatement = `INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES ('${new_employee_answers.first_name}', '${new_employee_answers.last_name}', ${role_id}, ${manager_id})`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(
        `Added ${new_employee_answers.first_name} ${new_employee_answers.last_name} to the database`
      );
    })
    .catch(console.log)
    .then(() => init());
}
// fix
function updateEmployee() {
  let queryStatement = `UPDATE employee (first_name, last_name, role_id ) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      init();
    })
    .catch(console.log)
    .then(() => init());

  console.log(`Updated employee's role`);
}

/**
 * JOIN between dept and role tables
 */
function viewAllRoles() {
  let queryStatement = `SELECT r.id, r.title, d.name AS department, r.salary FROM departments d JOIN roles r ON r.department_id = d.id`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      let option = "role";
      createTable(rows, option);
    })
    .then(() => init());
}

//fix
function addRole(new_role_answers) {
  currentRoleList.push(new_role_answers.new_role);
  let queryStatement = `INSERT INTO role (title, salary, department_id ) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Departments have been updated`);
      init();
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
