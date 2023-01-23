import mysql from 'mysql2/promise';

export default class DAO {

    async getConnection() {
        try {
            return await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async execute(sql) {
        try {
            const con = await this.getConnection();
            if (con) {
                const res = await con.execute(sql);
                con.end();
                return res;
            }
            return null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
