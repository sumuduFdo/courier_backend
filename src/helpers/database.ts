import { Pool } from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize()

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    port: 5432,
    database: 'courier_db'
});

export default pool;