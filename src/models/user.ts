import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Unique,
  AllowNull,
} from "sequelize-typescript";

interface UserAttributes {
  userId: string; // PRIMARY KEY
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  houseNo: string;
  streetAddress: string;
  city: string;
  zipCode: number;
  createdAt: Date;
  userType: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

@Table({ modelName: "User", tableName: "Users" })
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
  userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Unique(true)
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Unique(true)
  phone!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  houseNo!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  streetAddress!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  zipcode!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  userType!: string;
}

export default User;