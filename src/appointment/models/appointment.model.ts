import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "../../service/models/service.model";
import { ServiceAppointment } from "../../service/models/serviceAppointment.model";
import { Patient } from "../../patient/models/patient.model";
import { Payment } from "../../payment/models/payment.model";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";

interface IAppointmentCreationAttr {
  datetime: Date;
  status: string;
  notes: string;
  doctorId: number;
  roomId: number;
  patientId: number;
}

@Table({ tableName: "appointment", timestamps: false })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "2025-05-10",
    description: "meeting time",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare datetime: Date;

  @ApiProperty({
    example: "cancelled",
    description: "meeting time is cancelled",
  })
  @Column({
    type: DataType.ENUM(
      "scheduled",
      "completed",
      "cancelled",
      "no-show",
      "rescheduled",
      "in-progress"
    ),
  })
  declare status: string;

  @ApiProperty({
    example: "consultation",
    description: "meeting",
  })
  @Column({
    type: DataType.ENUM(
      "checkup",
      "consultation",
      "surgery",
      "therapy",
      "follow-up",
      "emergency"
    ),
  })
  declare type: string;

  @ApiProperty({
    example: "information",
    description: "information about parient health",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare notes: string;

  @ApiProperty({
    example: "3",
    description: "Id number of doctor",
  })
  //   @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare doctorId: number;

  //   @BelongsTo(() => Doctor)
  //   doctor: Doctor;

  @ApiProperty({
    example: "3",
    description: "Id number of Room",
  })
  declare roomId: number;

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
  doctor: Patient;

  @BelongsToMany(() => Service, () => ServiceAppointment)
  services: Service[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];
}
