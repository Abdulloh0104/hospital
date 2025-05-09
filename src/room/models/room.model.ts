import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";
import { Bad } from "../../bad/models/bad.model";

interface IRoomCreationAttr {
  roomNumber: number;
  description: string;
  type: string;
  status: string;
}

@Table({ tableName: "room", timestamps: false })
export class Room extends Model<Room, IRoomCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Xona raqami",
    description: "room number",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare roomNumber: number;

  @ApiProperty({
    example: "Xona info",
    description: "room",
  })
  @Column({
    type: DataType.ENUM(
      "standard",
      "deluxe",
      "suite",
      "conference",
      "single",
      "double"
    ),
  })
  declare type: string;

  @ApiProperty({
    example: "Xona haqida ma'lumot",
    description: "Extra infoo about room",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @ApiProperty({
    example: "Xona info",
    description: "room",
  })
  @Column({
    type: DataType.ENUM(
      "available",
      "occupied",
      "maintenance",
      "cleaning",
      "reserved"
    ),
  })
  declare status: string;

  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];

  @HasMany(() => Bad)
  bads: Bad[];
}
