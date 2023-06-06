const db = require("../lib/db");
const createTable = require("../lib/createTable");
const Prompt = require("../lib/inquirerPrompts");
const inquirer = require("inquirer");

class Role {
  getList(cb) {
    let queryStatement = `SELECT r.id, r.title, d.name AS department, r.salary FROM departments d JOIN roles r ON r.department_id = d.id`;
    let roleList = db
      .promise()
      .query(queryStatement)
      .then(([rows]) => {
        let option = "role";
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

    return roleList;
  }

  addRole(new_role_answers, cb) {
    let department_id =
      Prompt[0].findIndex((dept) => dept === new_role_answers.department) + 1;
    let queryStatement = `INSERT INTO roles (title, department_id, salary) VALUES ('${new_role_answers.new_role}', ${department_id}, ${new_role_answers.salary})`;
    db.promise()
      .query(queryStatement)
      .then(([rows]) => {
        Prompt[1].push(new_role_answers.new_role);
        console.log(`Added ${new_role_answers.new_role} to the database.`);
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
  deleteRole() {}
}

module.exports = Role;
