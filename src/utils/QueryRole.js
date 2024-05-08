module.exports = {
    queryGetDifAdmin: function(tableName){
        return `SELECT * FROM ${tableName} 
        WHERE Ma${tableName} != '01AD'`;
    }   
}