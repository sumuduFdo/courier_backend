import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";
import User from "./user";

interface ShipmentAttributes {
  id: string; // PRIMARY KEY
  trackingNumber: string; // UNIQUE, NOT NULL
  userId: string; // FOREIGN KEY
  recipientName: string;
  recipientAddress: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  shipmentType: number; // REFERENCES TO SHIPMENT TYPE TABLE
  deliveryType: number; // REFERENCES TO DELIVERY TYPE TABLE - EXPRESS/NORMAL
}

/* Defines the type of Object passed to the sequelize model.create()
    here the id is optional as it is automatically added in database*/
// Id is declared optional when creting an instance of the model
interface ShipmentCreationAttributes
  extends Optional<ShipmentAttributes, "id"> {}

@Table({ modelName: "Shipment", tableName: "Shipments" })
class Shipment extends Model<ShipmentAttributes, ShipmentCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  trackingNumber!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ForeignKey(() => User)
  @BelongsTo(() => User, "userId")
  userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  recipientName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  recipientAddress!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  weight!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  length!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  width!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  height!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  shipmentType!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  deliveryType!: number;

  @CreatedAt
  createdDate!: Date;
  
  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  lastUpdated!: Date;
}

export default Shipment;
