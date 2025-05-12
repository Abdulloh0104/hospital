import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Medication } from "../../medications/models/medication.model";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";

interface IPrescriptionCreationAttr {
  dosage: string;
  duration: string;
  frequency: string;
  medicationId: number;
  medicalRecordId: number;
}

@Table({ tableName: "prescription", timestamps: false })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "8000",
    description: "Amount",
  })
  @Column({
    type: DataType.STRING(),
  })
  declare dosage: string;

  @ApiProperty({
    example: "15/160",
    description: "3 mahal",
  })
  @Column({
    type: DataType.STRING(),
  })
  declare duration: string;

  @ApiProperty({
    example: "Kottalaga",
    description: "2 tadan",
  })
  @Column({
    type: DataType.STRING(),
  })
  declare frequency: string;

  @ApiProperty({
    example: "8",
    description: "Id number of medication",
  })
  @ForeignKey(() => Medication)
  @Column({
    type: DataType.INTEGER,
  })
  declare medicationId: number;

  @BelongsTo(() => Medication)
  medication: Medication;

  @ApiProperty({
    example: "5",
    description: "Id number of medical record",
  })
  @ForeignKey(() => MedicalRecord)
  @Column({
    type: DataType.INTEGER,
  })
  declare medicalRecordId: number;

  @BelongsTo(() => MedicalRecord)
  medicalRecord: MedicalRecord;
}
