import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patient/models/patient.model";
import { Appointment } from "../../appointment/models/appointment.model";

interface IPaymentCreationAttr {
  amount: number;
  datetime: Date;
  type: string;
  status: string;
  patientId: number;
  appointmentId: number;
}

@Table({ tableName: "payment", timestamps: false })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "200",
    description: "price",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare amount: number;

  @ApiProperty({
    example: "2025-05-15",
    description: "Date",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare datetime: Date;

  @ApiProperty({
    example: "cash",
    description: "payment type",
  })
  @Column({
    type: DataType.ENUM(
      "cash",
      "card",
      "transfer",
      "online",
      "insurance",
      "debt"
    ),
  })
  declare type: string;

  @ApiProperty({
    example: "paid",
    description: "price",
  })
  @Column({
    type: DataType.ENUM(
      "paid",
      "unpaid",
      "partial",
      "pending",
      "failed",
      "refunded"
    ),
  })
  declare status: string;

  @ApiProperty({
    example: "3",
    description: "Id number of Patient",
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({
    example: "4",
    description: "Id number of Appointent",
  })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare appointmentId: number;
  @BelongsTo(() => Appointment)
  appointment: Appointment;
}
