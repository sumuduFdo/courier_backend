import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../helpers/database";


// User Model
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: CreationOptional<string>;    // CreationOptional -> Not required in initialization 
  declare firstName: string;
  declare lastName: string;
  declare dateOfBirth: Date;
  declare email: string;
  declare phone: string;
  declare houseNo: string;
  declare streetAddress: string;
  declare city: string;
  declare zipCode: string;
  declare createdAt: CreationOptional<Date>;
  declare password: string;
  declare isAdmin: boolean;
}

User.init(
  {
    userId: { type: DataTypes.STRING,  primaryKey: true, allowNull: false, defaultValue: sequelize.fn('gen_random_uuid') },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    houseNo: { type: DataTypes.STRING, allowNull: false },
    streetAddress: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: "users", modelName: "user", updatedAt: false, sequelize }
);

export default User;

