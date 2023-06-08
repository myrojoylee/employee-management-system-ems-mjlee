const dbConn = require("../config/db");
const createTable = require("./createTable");

class Department {
  // performs query and gets raw data
  async getData() {
    let queryStatement = `SELECT * FROM departments`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
    return rows;
  }

  // gets dept list for inquirer prompts
  async getList() {
    const rows = await this.getData();
    let currentDeptList = rows.map((val) => val.name);
    return currentDeptList;
  }

  // generates formatted table
  async getTable() {
    const rows = await this.getData();
    return createTable(rows);
  }

  // adds a new dept
  async addDept(new_department_answer) {
    let queryStatement = `INSERT INTO departments (name) VALUES ('${new_department_answer.department_name}')`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }

  // deletes an existing dept
  async deleteDept(delete_dept_answers) {
    let queryStatement = `DELETE FROM departments WHERE name = '${delete_dept_answers.delete_department}'`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }
}

module.exports = Department;
