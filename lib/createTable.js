// this helper function creates formatted tables
function createTable(rows, option) {
  const { table } = require("table");
  let array;
  let columnHeadings = Object.keys(rows[0]);
  switch (option) {
    case "dept":
      console.log(rows);
      array = rows.map((val) => [val.id, val.name]);
      break;
    case "empl":
      console.log(rows);
      array = rows.map((val) => [
        val.id,
        val.first_name,
        val.last_name,
        val.role_id,
        val.manager_id,
      ]);
      break;
    case "role":
      assignDepartment(rows);
      array = rows.map((val) => [
        val.id,
        val.title,
        val.department_id,
        val.salary,
      ]);
      break;
  }
  array.unshift(columnHeadings);
  console.log(table(array));
}

function assignDepartment(rows) {
  for (let i = 0; i < rows.length; i++) {
    switch (rows[i].department_id) {
      case 1:
        rows[i].department_id = "Sales";
        break;
      case 2:
        rows[i].department_id = "Engineering";
        break;
      case 3:
        rows[i].department_id = "Finance";
        break;
      case 4:
        rows[i].department_id = "Legal";
        break;
    }
  }
  console.log(rows);
  return rows;
}

module.exports = [createTable, assignDepartment];
