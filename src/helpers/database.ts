// const user_name = 'postgres';
// const password = '1234';
// const host = 'localhost';
// const port = 5432;

import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize(
    'courier_db', 'postgres', '1234', {
        host: 'localhost',
        dialect: 'postgres'
    }
);

export default sequelize;