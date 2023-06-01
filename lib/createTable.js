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
      assignManager(rows);
      assignTitle(rows);
      array = rows.map((val) => [
        val.id,
        val.first_name,
        val.last_name,
        val.title,
        val.manager,
      ]);
      break;
    case "role":
      assignDepartment(rows);
      array = rows.map((val) => [
        val.id,
        val.title,
        val.department,
        val.salary,
      ]);
      break;
  }
  array.unshift(columnHeadings);
  console.log(table(array));
}

function assignTitle(rows) {
  for (let i = 0; i < rows.length; i++) {
    switch (rows[i].title) {
      case 1:
        rows[i].title = "Sales Lead";
        break;
      case 2:
        rows[i].title = "Salesperson";
        break;
      case 3:
        rows[i].title = "Lead Engineer";
        break;
      case 4:
        rows[i].title = "Software Engineer";
        break;
      case 5:
        rows[i].title = "Account Manager";
        break;
      case 6:
        rows[i].title = "Accountant";
        break;
      case 7:
        rows[i].title = "Legal Team Lead";
        break;
      case 8:
        rows[i].title = "Lawyer";
        break;
    }
  }
  console.log(rows);
  return rows;
}

function assignDepartment(rows) {
  for (let i = 0; i < rows.length; i++) {
    switch (rows[i].department) {
      case 1:
        rows[i].department = "Sales";
        break;
      case 2:
        rows[i].department = "Engineering";
        break;
      case 3:
        rows[i].department = "Finance";
        break;
      case 4:
        rows[i].department = "Legal";
        break;
    }
  }
  console.log(rows);
  return rows;
}

function assignManager(rows) {
  for (let i = 0; i < rows.length; i++) {
    switch (rows[i].manager) {
      case 1:
        rows[i].manager = "Buzz Lightyear";
        break;
      case 3:
        rows[i].manager = "Queen of Hearts";
        break;
      case 5:
        rows[i].manager = "Pluto Planet";
        break;
      case 7:
        rows[i].manager = "Cruella de Vil";
        break;
    }
  }
  console.log(rows);
  return rows;
}

module.exports = [createTable, assignDepartment, assignTitle, assignManager];
