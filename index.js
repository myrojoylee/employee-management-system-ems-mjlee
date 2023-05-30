// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");
const db = require("./lib/db");
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
      reply = `we see all employees`;
      console.log(reply);
      break;
    case "View All Departments":
      viewAllDepartments();
      break;
    case "Add Department":
      inquirer
        .prompt(addDepartmentPrompt)
        .then((new_department_answer) => addDepartment(new_department_answer));
      break;
    default:
      reply = `i guess we see something else`;
      console.log(reply);
  }
}

function viewAllDepartments() {
  db.promise()
    .query("SELECT * FROM departments")
    .then(([rows]) => {
      console.log(rows);
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

function addEmployee() {}

function updateEmployee() {}

function addRole() {}
