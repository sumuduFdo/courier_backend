import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize(
    'courier_db', 'postgres', '1234', {
        host: 'localhost',
        dialect: 'postgres'
    }
);

export default sequelize;