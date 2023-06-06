// this file contains all data arrays and inquirer prompts
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
    message: "What would you like to do? (Scroll and choose 'EXIT' to exit)",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Update Employee Managers",
      "View Employees by Manager",
      "View Employees by Department",
      "Delete Department",
      "Delete Role",
      "Delete Employee",
      "EXIT",
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

const updateEmpMgrPrompt = [
  {
    type: "list",
    name: "update_emp_mgr",
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

const deleteDepartmentPrompt = [
  {
    type: "list",
    name: "delete_department",
    message: "Which department did you want to delete?",
    choices: currentDeptList,
  },
];
const deleteRolePrompt = [
  {
    type: "list",
    name: "delete_role",
    message: "Which role did you want to delete?",
    choices: currentRoleList,
  },
];
const deleteEmployeePrompt = [
  {
    type: "list",
    name: "delete_emp",
    message: "Which employee did you want to delete?",
    choices: currentEmpList,
  },
];

module.exports = [
  currentDeptList,
  currentRoleList,
  currentEmpList,
  main_menu,
  addDepartmentPrompt,
  addEmployeePrompt,
  addRolePrompt,
  updateEmployeePrompt,
  updateEmpMgrPrompt,
  deleteDepartmentPrompt,
  deleteRolePrompt,
  deleteEmployeePrompt,
];
