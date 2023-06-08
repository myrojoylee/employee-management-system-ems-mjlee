const dbConn = require("../config/db");
const createTable = require("./createTable");
const Department = require("./department");

class Role {
  // performs query and gets raw data
  async getData() {
    let queryStatement = `SELECT r.id, r.title, d.name AS department, r.salary FROM departments d JOIN roles r ON r.department_id = d.id`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
    return rows;
  }

  // gets role list for inquirer prompts
  async getList() {
    const rows = await this.getData();
    let currentRoleList = rows.map((val) => val.title);
    return currentRoleList;
  }

  // generates formatted table
  async getTable() {
    const rows = await this.getData();
    return createTable(rows);
  }

  async addRole(new_role_answers, deptList) {
    const department_id =
      deptList.findIndex((dept) => dept === new_role_answers.department) + 1;
    let queryStatement = `INSERT INTO roles (title, department_id, salary) VALUES ('${new_role_answers.new_role}', ${department_id}, ${new_role_answers.salary})`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }

  // bonus
  async deleteRole(delete_role_answers) {
    let queryStatement = `DELETE FROM roles WHERE title = '${delete_role_answers.delete_role}' `;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }
}

module.exports = Role;
