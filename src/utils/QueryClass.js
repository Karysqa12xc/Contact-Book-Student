module.exports = {
    queryAddNewDataTableLop: function(tableName, TenLop, SiSo){
        return `INSERT INTO ${tableName}(TenLop, SiSo)
                VALUES('${TenLop}', ${SiSo})`;
    },
}