const db = require("../lib/db");
const createTable = require("../lib/createTable");
const Prompt = require("../lib/inquirerPrompts");
const inquirer = require("inquirer");

class Department {
  getList(cb) {
    let queryStatement = `SELECT * FROM departments`;
    let deptList = db
      .promise()
      .query(queryStatement)
      .then(([rows, fields]) => {
        let option = "dept";
        let message = createTable(rows, option);
        message = `\n${message}\nPress Enter to return to main menu.`;
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

    return deptList;
  }

  addDept(new_department_answer, cb) {
    let queryStatement = `INSERT INTO departments (name) VALUES ('${new_department_answer.department_name}')`;
    db.promise()
      .query(queryStatement)
      .then(([rows]) => {
        Prompt[0].push(new_department_answer.department_name);
        console.log(
          `\nAdded ${new_department_answer.department_name} to the database.`
        );
        let message = `\nPress Enter to return to main menu.`;
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

  // bonus
  deleteDept() {}
}

module.exports = Department;
