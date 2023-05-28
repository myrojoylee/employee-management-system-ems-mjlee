// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");

// ================================================= //
//               ---- QUESTION BANKS ----            //
// ================================================= //
const menuOption = [
  {
    type: "list",
    name: "main_menu",
    message: "What would you like to do? ",
    choices: [
      "View all Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

const viewAllEmployees = [];
const addEmployee = [];
const updateEmployeeRole = [];
const viewAllRoles = [];
const addRole = [];
const viewAllDepartments = [];
const addDepartment = [];

function init() {
  inquirer.prompt(questions).then();
}
