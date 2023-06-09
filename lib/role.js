const createTable = require("./createTable");

class Role {
  constructor(db) {
    this.db = db;
  }
  // performs query and gets raw data
  async getData() {
    let queryStatement = `SELECT r.id, r.title, d.name AS department, r.salary FROM departments d JOIN roles r ON r.department_id = d.id`;
    const [rows] = await this.db.query(queryStatement);
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
    const [rows] = await this.db.query(queryStatement);
  }

  // bonus
  async deleteRole(delete_role_answers) {
    let queryStatement = `DELETE FROM roles WHERE title = '${delete_role_answers.delete_role}' `;
    const [rows] = await this.db.query(queryStatement);
  }
}

module.exports = Role;
