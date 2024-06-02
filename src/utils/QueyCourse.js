module.exports = {
    queryGetByOuterTableMonHoc: function(tableName, tableJoinAccount){
        return `SELECT ${tableName}.*,
        ${tableJoinAccount}.HoVaTen
        FROM ${tableName} left join ${tableJoinAccount} on 
        ${tableName}.Ma${tableJoinAccount} = 
        ${tableJoinAccount}.Ma${tableJoinAccount}`;
    },
    queryAddNewDataMonHoc: function(tableName, 
        courseName, startTime, endTime, moneyCourse
    ){
        return `INSERT INTO ${tableName}(TenMonHoc, ThoiGianBatDauMonHoc, ThoiGianKetThucMonHoc, SoTien)
                VALUES(N'${courseName}', 
                    '${startTime}', '${endTime}', ${moneyCourse})`;
    },
    queryUpdateMaTaiKhoanOfCourse: function(tableName, tableJoinAccount, value, condition){
        return `UPDATE ${tableName} 
                SET Ma${tableJoinAccount} = '${value}'
                WHERE Ma${tableName} = ${condition}`;
    },
    queryDeleteCourse: function(tableName, id){
        return `DELETE FROM ${tableName} WHERE Ma${tableName} = ${id};`
    }
}