module.exports = {
  queryGetAll: function (tableName) {
    return `SELECT * FROM ${tableName}`;
  },
  queryGetAllReverse: function (tableName) {
    return `SELECT * 
    FROM ${tableName} 
    ORDER BY Ten${tableName}`;
  },
  queryGetById: function (tableName, id) {
    return `SELECT * 
    FROM ${tableName} 
    Where Ma${tableName} = '${id}'`;
  },
};
