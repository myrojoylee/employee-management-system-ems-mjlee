// this helper function creates formatted tables
function createTable(rows) {
  const { table } = require("table");
  let array;
  array = [Object.keys(rows[0]), ...rows.map((val) => Object.values(val))];
  console.log(table(array));
  return table(array);
}

module.exports = createTable;
