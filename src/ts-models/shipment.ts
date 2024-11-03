import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import User from "../models/user";

class Shipment extends Model<InferAttributes<Shipment>, InferCreationAttributes<Shipment>> {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<User['userId']>;
    declare trackingNumber: string;
    declare recipientName: string;
    declare recipientAddress: string;
    declare weight: number;
    declare height: number;
    declare length: number;
    declare width: number;
    declare shipmentType: string;
    declare deliveryType: string;
}

Shipment.init({
    id: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    trackingNumber: {type: DataTypes.STRING, allowNull: false},
    recipientName: {type: DataTypes.STRING, allowNull: false},
    recipientAddress: {type: DataTypes.STRING, allowNull: false},
    weight: {type: DataTypes.FLOAT, allowNull: false},
    height: {type: DataTypes.FLOAT, allowNull: false},
    length: {type: DataTypes.FLOAT, allowNull: false},
    width: {type: DataTypes.FLOAT, allowNull: false},
    shipmentType: {type: DataTypes.STRING, allowNull: false},
    deliveryType: {type: DataTypes.STRING, allowNull: false},
}, {tableName: 'Shipments'});