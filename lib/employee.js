const dbConn = require("../config/db");
const createTable = require("./createTable");

class Employee {
  // performs query and gets raw data
  async getData() {
    let queryStatement = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles r ON e.role_id = r.id JOIN departments d ON d.id = r.department_id`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
    return rows;
  }

  // gets employee list for inquirer prompts
  async getList() {
    const rows = await this.getData();
    let currentEmpList = rows.map(
      (val) => `${val.first_name} ${val.last_name}`
    );
    return currentEmpList;
  }

  // uses raw data from query and generates formatted table
  async getTable() {
    const rows = await this.getData();
    return createTable(rows);
  }

  async addEmployee(new_employee_answers, empList, roleList) {
    let role_id =
      roleList.findIndex(
        (role) => role === new_employee_answers.employee_role
      ) + 1;
    let manager_id;
    empList.unshift("None");
    new_employee_answers.manager != "None"
      ? (manager_id = empList.findIndex(
          (emp) => emp === new_employee_answers.manager
        ))
      : (manager_id = "null");

    let queryStatement = `INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES ('${new_employee_answers.first_name}', '${new_employee_answers.last_name}', ${role_id}, ${manager_id})`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }

  async updateEmployee(update_employee_answers, roleList) {
    let role_id =
      roleList.findIndex((emp) => emp === update_employee_answers.update_role) +
      1;
    let first_name = update_employee_answers.update_employee.split(" ")[0];
    let last_name = update_employee_answers.update_employee.split(" ")[1];
    let queryStatement = `UPDATE employees SET first_name = "${first_name}", last_name = "${last_name}", role_id = ${role_id} WHERE first_name = "${first_name}"`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }

  //bonus
  async updateEmployeeManager(update_emp_mgr_answers, empList) {
    let employees_id =
      empList.findIndex(
        (emp) => emp === update_emp_mgr_answers.update_employee
      ) + 1;
    let manager_id =
      empList.findIndex((emp) => emp === update_emp_mgr_answers.update_mgr) + 1;
    let queryStatement = `UPDATE employees SET manager_id = ${manager_id} WHERE employees.id = ${employees_id}`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }

  async viewEmployeesByManager() {
    let queryStatement = `SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id ORDER BY e.manager_id ASC`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
    return createTable(rows);
  }
  async viewEmployeesByDept() {
    let queryStatement = `SELECT e.id, e.first_name, e.last_name, d.name AS department FROM employees e JOIN roles r ON e.role_id = r.id JOIN departments d ON d.id = r.department_id ORDER by d.name ASC`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
    return createTable(rows);
  }
  async deleteEmployee(delete_emp_answers) {
    let first_name = delete_emp_answers.delete_emp.split(" ")[0];
    let last_name = delete_emp_answers.delete_emp.split(" ")[1];
    let queryStatement = `DELETE FROM employees WHERE first_name = '${first_name}' AND last_name = '${last_name}'`;
    const db = await dbConn;
    const [rows] = await db.query(queryStatement);
  }
}

module.exports = Employee;
