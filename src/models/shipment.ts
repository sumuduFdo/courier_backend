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
class Shipment extends Model<
  InferAttributes<Shipment>,
  InferCreationAttributes<Shipment>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare trackingNumber: string;
  declare recipientName: string;
  declare recipientAddress: string;
  declare weight: number;
  declare shipmentType: string;
  declare deliveryType: string;
  declare createdAt: CreationOptional<Date>;
  declare shipmentStatus: string;
  declare lastUpdated: Date;
}

Shipment.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: sequelize.fn('gen_random_uuid') },
    trackingNumber: { type: DataTypes.STRING, allowNull: false },
    recipientName: { type: DataTypes.STRING, allowNull: false },
    recipientAddress: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    shipmentType: { type: DataTypes.STRING, allowNull: false },
    deliveryType: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    shipmentStatus: {type: DataTypes.STRING, allowNull: false},
    lastUpdated: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "shipments", modelName: "shipment", createdAt: true, updatedAt: false, sequelize }
);

Shipment.belongsTo(User, {foreignKey: 'userId'});
// User.hasMany(Shipment);

export default Shipment;
