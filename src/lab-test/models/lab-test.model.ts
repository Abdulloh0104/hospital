import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctor/models/doctor.model";
import { Patient } from "../../patient/models/patient.model";

interface ILabTestCreationAttr {
  testName: string;
  normalRange: string;
  result: string;
  notes: string;
  doctorId: number;
  patientId: number;
}

@Table({ tableName: "labtest" })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Qon turini aniqlash",
    description: "find Blood type",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare testName: string;

  @ApiProperty({
    example: "Standart labaratoriya natijasi",
    description: "standart labaratory result",
  })
  @Column({
    type: DataType.STRING,
  })
  declare normalRange: string;

  @ApiProperty({
    example: "Labaratoriya natijasi",
    description: "Labaratory result",
  })
  @Column({
    type: DataType.STRING,
  })
  declare result: string;

  @ApiProperty({
    example: "Labaratoriya hoqida",
    description: "About labaratory",
  })
  @Column({
    type: DataType.STRING,
  })
  declare notes: string;

  @ApiProperty({
    example: "Labaratoriya doctori",
    description: "Labaratory doctori",
  })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
  
  @ApiProperty({
    example: "Labaratoriya bemori",
    description: "Labaratory bemori",
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}
