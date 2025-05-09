import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../room/models/room.model";
import { Prescription } from "../../prescription/models/prescription.model";

interface IMedicalRecordCreationAttr {
  visitday: Date;
  backDay: Date;
  description: string;
  desease: string;
  treatment: string;
  appointmentId: number;
  roomId: number;
}

@Table({ tableName: "medicalrecord" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "2025-05-10",
    description: "first Day",
  })
  @Column({
    type: DataType.DATEONLY(),
  })
  declare visitday: Date;

  @ApiProperty({
    example: "2025-06-10",
    description: "last Day",
  })
  @Column({
    type: DataType.DATEONLY(),
  })
  declare backDay: Date;

  @ApiProperty({
    example: "Info",
    description: "Extra information",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @ApiProperty({
    example: "Yo'tal",
    description: "Illness information",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare desease: string;

  @ApiProperty({
    example: "Drugs",
    description: "Treatment information",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare treatment: string;

  @ApiProperty({
    example: "4",
    description: "Id number of Appointent",
  })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  appointmentId: number;
  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @ApiProperty({
    example: "4",
    description: "Id number of Room",
  })
  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare roomId: number;

  @BelongsTo(() => Room)
  room: Room;

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
