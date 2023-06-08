// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");
const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
const figlet = require("figlet");

// Question Banks
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

// ==================================================== //
//                  FUNCTIONS BEGIN BELOW               //
// ==================================================== //

// ascii title art
figlet(`EMPLOYEE\nTRACKER`, function (err, data) {
  err ? console.error(err) : console.log(data);

  init();
});

function init() {
  inquirer
    .prompt(main_menu)
    .then((main_menu_answer) => nextStep(main_menu_answer));
}

async function nextStep(main_menu_answer) {
  const dept = new Department();
  const employee = new Employee();
  const role = new Role();
  let deptList = await dept.getList();
  let empList = await employee.getList();
  let roleList = await role.getList();
  switch (main_menu_answer.main_menu) {
    case "View All Employees":
      await employee.getTable();
      break;
    case "View All Roles":
      await role.getTable();
      break;
    case "View All Departments":
      await dept.getTable();
      break;
    case "Add Department":
      await inquirer
        .prompt(addDepartmentPrompt)
        .then((new_department_answer) => {
          dept.addDept(new_department_answer);
          console.log(
            `\nAdded ${new_department_answer.department_name} to the database.\n`
          );
        });
      break;
    case "Add Employee":
      await inquirer
        .prompt([
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
            choices: roleList,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager? ",
            choices: empList,
          },
        ])
        .then((new_employee_answers) => {
          employee.addEmployee(new_employee_answers, empList, roleList);
          let fullName = `${new_employee_answers.first_name} ${new_employee_answers.last_name}`;
          console.log(`\nAdded ${fullName} to the database.\n`);
        });
      break;
    case "Add Role":
      await inquirer
        .prompt([
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
            choices: deptList,
          },
        ])
        .then((new_role_answers) => {
          role.addRole(new_role_answers, deptList);
          console.log(`\nAdded new role to the database.\n`);
        });

      break;
    case "Update Employee Role":
      await inquirer
        .prompt([
          {
            type: "list",
            name: "update_employee",
            message: "Choose the employee below you would like to update: ",
            choices: empList,
          },
          {
            type: "list",
            name: "update_role",
            message:
              "Which role do you want to assign to the selected employee? ",
            choices: roleList,
          },
        ])
        .then((update_employee_answers) => {
          employee.updateEmployee(update_employee_answers, roleList);
          console.log(
            `\nUpdated ${update_employee_answers.update_employee}'s role.\n`
          );
        });
      break;
    case "Update Employee Managers":
      await inquirer
        .prompt([
          {
            type: "list",
            name: "update_employee",
            message: "Choose the employee below you would like to update: ",
            choices: empList,
          },
          {
            type: "list",
            name: "update_mgr",
            message:
              "Which manager do you want to assign to the selected employee? ",
            choices: empList,
          },
        ])
        .then((update_emp_mgr_answers) => {
          employee.updateEmployeeManager(update_emp_mgr_answers, empList);
          console.log(
            `\nUpdated ${update_emp_mgr_answers.update_employee}'s manager.\n`
          );
        });
      break;
    case "View Employees by Manager":
      await employee.viewEmployeesByManager();
      break;
    case "View Employees by Department":
      await employee.viewEmployeesByDept();
      break;
    case "Delete Department":
      await inquirer
        .prompt([
          {
            type: "list",
            name: "delete_department",
            message: "Which department did you want to delete?",
            choices: deptList,
          },
        ])
        .then((delete_dept_answers) => {
          dept.deleteDept(delete_dept_answers, deptList);
          console.log(
            `\nDeleted the ${delete_dept_answers.delete_department} department.\n`
          );
        });
      break;
    case "Delete Role":
      await inquirer
        .prompt([
          {
            type: "list",
            name: "delete_role",
            message: "Which role did you want to delete?",
            choices: roleList,
          },
        ])
        .then((delete_role_answers) => {
          role.deleteRole(delete_role_answers, roleList);
          console.log(
            `\nDeleted the ${delete_role_answers.delete_role} role.\n`
          );
        });
      break;
    case "Delete Employee":
      await inquirer
        .prompt([
          {
            type: "list",
            name: "delete_emp",
            message: "Which employee did you want to delete?",
            choices: empList,
          },
        ])
        .then((delete_emp_answers) => {
          employee.deleteEmployee(delete_emp_answers);
          console.log(
            `\nDeleted ${delete_emp_answers.delete_emp} as an employee.\n`
          );
        });
      break;
    case "EXIT":
      process.exit();
  }
  init();
}
