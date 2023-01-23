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
            return null;
        }
    }

    async createDatabase() {
        try {
            const con = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            });
            const sql = `CREATE DATABASE IF NOT EXISTS snake;`;
            await con.execute(sql);
            con.end();
            return true;
        } catch (e) {
            return false;
        }
    }

    async dropDatabase() {
        try {
            const con = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            });
            const sql = `DROP DATABASE IF EXISTS snake;`;
            await con.execute(sql);
            con.end();
            return true;
        } catch (e) {
            return false;
        }
    }
}
