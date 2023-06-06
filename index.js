// ================================================= //
//                 ---- DEPENDENCIES ----            //
// ================================================= //
const inquirer = require("inquirer");
const Department = require("./class-lib/department");
const Role = require("./class-lib/role");
const Employee = require("./class-lib/employee");
const Prompt = require("./lib/inquirerPrompts");
const figlet = require("figlet");

function init() {
  figlet(`EMPLOYEE\nTRACKER`, function (err, data) {
    err ? console.error(err) : console.log(data);

    inquirer
      .prompt(Prompt[3])
      .then((main_menu_answer) => nextStep(main_menu_answer));
  });
}

init();

function nextStep(main_menu_answer) {
  const dept = new Department();
  const employee = new Employee();
  const role = new Role();
  switch (main_menu_answer.main_menu) {
    case "View All Employees":
      employee.getList(init);
      break;
    case "View All Roles":
      role.getList(init);
      break;
    case "View All Departments":
      dept.getList(init);
      break;
    case "Add Department":
      inquirer.prompt(Prompt[4]).then((new_department_answer) => {
        dept.addDept(new_department_answer, init);
      });
      break;
    case "Add Employee":
      inquirer
        .prompt(Prompt[5])
        .then((new_employee_answers) =>
          employee.addEmployee(new_employee_answers, init)
        );
      break;
    case "Add Role":
      inquirer
        .prompt(Prompt[6])
        .then((new_role_answers) => role.addRole(new_role_answers, init));
      break;
    case "Update Employee Role":
      inquirer
        .prompt(Prompt[7])
        .then((update_employee_answers) =>
          employee.updateEmployee(update_employee_answers, init)
        );
      break;
    case "Update Employee Managers":
      inquirer
        .prompt(Prompt[8])
        .then((update_emg_mgr_answers) => addRole(update_emg_mgr_answers));
      break;
    case "View Employees by Manager":
      inquirer.prompt(Prompt);
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
