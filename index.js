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
    name: "delete_role",
    message: "Which role did you want to delete?",
    choices: currentEmpList,
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
      break;
    case "Update Employee Managers":
      inquirer
        .prompt(deleteDepartmentPrompt)
        .then((delete_dept_answers) => addRole(delete_dept_answers));
      break;
    case "View Employees by Manager":
      inquirer;
      viewEmployeesByManager();
      break;
    case "View Employees by Department":
      viewEmployeesByDept();
      break;
    case "Delete Department":
      inquirer
        .prompt(deleteDepartmentPrompt)
        .then((delete_dept_answers) => deleteDept(delete_dept_answers));
      break;
    case "Delete Role":
      inquirer
        .prompt(deleteRolePrompt)
        .then((delete_role_answers) => deleteRole(delete_role_answers));
      break;
    case "Delete Employee":
      inquirer
        .prompt(deleteEmployeePrompt)
        .then((delete_emp_answers) => deleteEmployee(delete_emp_answers));
      break;
    case "EXIT":
      process.exit();
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
  let queryStatement = `INSERT INTO departments (name) VALUES ('${new_department_answer.department_name}')`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      currentDeptList.push(new_department_answer.department_name);
      console.log(
        `Added ${new_department_answer.department_name} to the database.`
      );
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
      let fullName = `${new_employee_answers.first_name} ${new_employee_answers.last_name}`;
      currentEmpList.push(fullName);
      console.log(`Added ${fullName} to the database`);
    })
    .catch(console.log)
    .then(() => init());
}

function updateEmployee(update_employee_answers) {
  let role_id =
    currentRoleList.findIndex(
      (emp) => emp === update_employee_answers.update_role
    ) + 1;
  let first_name = update_employee_answers.update_employee.split(" ")[0];
  let last_name = update_employee_answers.update_employee.split(" ")[1];
  let queryStatement = `UPDATE employees SET first_name = "${first_name}", last_name = "${last_name}", role_id = ${role_id} WHERE first_name = "${first_name}"`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Updated ${update_employee_answers.update_employee}'s role`);
    })
    .catch(console.log)
    .then(() => init());
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
  let department_id =
    currentDeptList.findIndex((dept) => dept === new_role_answers.department) +
    1;
  let queryStatement = `INSERT INTO roles (title, department_id, salary) VALUES ('${new_role_answers.new_role}', ${department_id}, ${new_role_answers.salary})`;
  db.promise()
    .query(queryStatement)
    .then(([rows]) => {
      console.log(`Added ${new_role_answers.new_role} to the database.`);
    })
    .catch(console.log)
    .then(() => init());
}

// =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=
// bonus material

function updateEmployeeManager() {}

function viewEmployeesByManager() {
  console.log(`insert query to view employees by manager`);
  process.exit();
}

function viewEmployeesByDept() {
  console.log(`insert query to view employees by dept`);
}

function deleteDept() {
  console.log(delete_dept_answers);
}

function deleteRole() {
  console.log(delete_role_answers);
}

function deleteEmployee() {
  console.log(delete_emp_answers);
}
