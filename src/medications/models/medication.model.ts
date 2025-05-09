import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Prescription } from "../../prescription/models/prescription.model";

interface IMedicationCreationAttr {
  name: string;
  madeDate: Date;
  expiryDate: Date;
  value: number;
  emount: number;
  description: string;
}

@Table({ tableName: "medication", timestamps: false })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Mukaltin",
    description: "Name of Drug",
  })
  @Column({
    type: DataType.STRING(100),
    unique: true,
  })
  declare name: string;

  @ApiProperty({
    example: "2025-05-10",
    description: "make time",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare madeDate: Date;

  @ApiProperty({
    example: "2025-010-10",
    description: "expiry date",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare expiryDate: Date;

  @ApiProperty({
    example: "20000",
    description: "price of Drug",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare value: number;

  @ApiProperty({
    example: "50",
    description: "Number of Drug",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare emount: number;

  @ApiProperty({
    example: "Info",
    description: "Usega information",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
