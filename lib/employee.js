const db = require("../lib/db");
const createTable = require("./createTable");
const Prompt = require("../lib/inquirerPrompts");
const inquirer = require("inquirer");

class Employee {
  getList(cb) {
    let queryStatement = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles r ON e.role_id = r.id JOIN departments d ON d.id = r.department_id`;
    let empList = db
      .promise()
      .query(queryStatement)
      .then(([rows]) => {
        let option = "empl";
        let message = createTable(rows, option);
        message = `\n${message}\nPress Enter to return to the main menu.`;
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: message,
            },
          ])
          .then(() => {
            if (cb) cb();
          });
      });

    return empList;
  }

  addEmployee(new_employee_answers, cb) {
    let role_id =
      Prompt[1].findIndex(
        (role) => role === new_employee_answers.employee_role
      ) + 1;

    let manager_id;
    new_employee_answers.manager != "None"
      ? (manager_id = Prompt[2].findIndex(
          (emp) => emp === new_employee_answers.manager
        ))
      : (manager_id = "null");

    let queryStatement = `INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES ('${new_employee_answers.first_name}', '${new_employee_answers.last_name}', ${role_id}, ${manager_id})`;
    db.promise()
      .query(queryStatement)
      .then(([rows]) => {
        let fullName = `${new_employee_answers.first_name} ${new_employee_answers.last_name}`;
        Prompt[2].push(fullName);
        console.log(`Added ${fullName} to the database`);
        let message = `\nPress Enter to return to the main menu.`;
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: message,
            },
          ])
          .then(() => {
            if (cb) cb();
          });
      });
  }

  updateEmployee(update_employee_answers, cb) {
    let role_id =
      Prompt[1].findIndex(
        (emp) => emp === update_employee_answers.update_role
      ) + 1;
    let first_name = update_employee_answers.update_employee.split(" ")[0];
    let last_name = update_employee_answers.update_employee.split(" ")[1];
    let queryStatement = `UPDATE employees SET first_name = "${first_name}", last_name = "${last_name}", role_id = ${role_id} WHERE first_name = "${first_name}"`;
    db.promise()
      .query(queryStatement)
      .then(([rows]) => {
        console.log(
          `Updated ${update_employee_answers.update_employee}'s role`
        );
        let message = `\nPress Enter to return to the main menu.`;
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: message,
            },
          ])
          .then(() => {
            if (cb) cb();
          });
      });
  }

  //bonus
  updateEmployeeManager() {}
  viewEmployeesByManager() {}
  viewEmployeesByDept() {}
  deleteEmployee() {}
}

module.exports = Employee;
