const db = require("../../config/database");

// Fetch all classes
async function getClasses() {
    try {
        const query = 'SELECT MaLop, TenLop, SiSo FROM Lop';
        const results = await db.connectAndQuerying(query);
        return results;
    } catch (error) {
        console.error('SQL error', error);
        throw error;
    }
}

// Fetch students by class ID from TaiKhoan table
async function getStudentsByClass(MaLop) {
    try {
        const query = `
            SELECT MaTaiKhoan, HoVaTen, NamSinh, 
            (SELECT TOP 1 TrangThai FROM DiemDanh WHERE MaTaiKhoan = t.MaTaiKhoan ORDER BY ThoiGian DESC) AS TrangThai
            FROM TaiKhoan t
            WHERE MaLop = ${MaLop} AND MaVaiTro = '01HS'
        `;
        const results = await db.connectAndQuerying(query);
        return results;
    } catch (error) {
        console.error('SQL error', error);
        throw error;
    }
}

// Save attendance records
async function saveAttendance(classId, attendance) {
    try {
        const currentDate = new Date().toISOString(); // Format date as ISO string

        // Start a transaction
        const startTransactionQuery = 'BEGIN TRANSACTION';
        await db.connectAndQuerying(startTransactionQuery);

        try {
            for (const record of attendance) {
                const query = `
                    INSERT INTO DiemDanh (MaTaiKhoan, MaLop, ThoiGian, TrangThai)
                    VALUES (${record.MaTaiKhoan}, ${classId}, '${currentDate}', ${record.TrangThai})
                `;
                await db.connectAndQuerying(query);
            }

            // Commit the transaction
            const commitTransactionQuery = 'COMMIT';
            await db.connectAndQuerying(commitTransactionQuery);
        } catch (error) {
            // Rollback the transaction in case of error
            const rollbackTransactionQuery = 'ROLLBACK';
            await db.connectAndQuerying(rollbackTransactionQuery);
            throw error;
        }
    } catch (error) {
        console.error('SQL error', error);
        throw error;
    }
}

module.exports = {
    getClasses,
    getStudentsByClass,
    saveAttendance
};
