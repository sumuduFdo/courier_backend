import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../helpers/database";
import User from "./user";
class ShipmentStatus extends Model<
  InferAttributes<ShipmentStatus>,
  InferCreationAttributes<ShipmentStatus>
> {
  declare code: CreationOptional<number>;
  declare title: string;
  declare description: string;
}

ShipmentStatus.init(
  {
    code: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "shipment_status",
    modelName: "ShipmentDetail",
    createdAt: false,
    updatedAt: false,
    sequelize,
  }
);
export default ShipmentStatus;
