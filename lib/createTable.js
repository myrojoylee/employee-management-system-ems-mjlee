// this helper function creates formatted tables
function createTable(rows, option) {
  const { table } = require("table");
  let array;
  switch (option) {
    case "dept":
      array = rows.map((val) => [val.id, val.name]);
      break;
    case "empl":
      array = [Object.keys(rows[0]), ...rows.map((val) => Object.values(val))];
      break;
    case "role":
      array = [Object.keys(rows[0]), ...rows.map((val) => Object.values(val))];
      break;
  }
  return table(array);
}

module.exports = createTable;

module.exports = createTable;
