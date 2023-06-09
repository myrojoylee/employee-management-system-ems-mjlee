const createTable = require("./createTable");

class Department {
  constructor(db) {
    this.db = db;
  }
  // performs query and gets raw data
  async getData() {
    let queryStatement = `SELECT * FROM departments`;
    const [rows] = await this.db.query(queryStatement);
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
    const [rows] = await this.db.query(queryStatement);
  }

  // deletes an existing dept
  async deleteDept(delete_dept_answers) {
    let queryStatement = `DELETE FROM departments WHERE name = '${delete_dept_answers.delete_department}'`;
    const [rows] = await this.db.query(queryStatement);
  }

  // view table of utilized budget per department
  async getUtilizedBudget() {
    let queryStatement = `SELECT SUM(salary) AS 'Utilized Budget', d.name AS Department FROM roles r JOIN departments d WHERE r.department_id = d.id GROUP BY department_id;`;
    const [rows] = await this.db.query(queryStatement);
    return createTable(rows);
  }
}

module.exports = Department;
