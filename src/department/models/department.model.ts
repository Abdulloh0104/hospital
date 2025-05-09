import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctor/models/doctor.model";
import { Staff } from "../../staff/models/staff.model";

interface IDepartmentCreationAttr {
  name: string;
  description: string;
  headDoctorId: number;
}

@Table({ tableName: "staff", timestamps: false })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Makro",
    description: "Bino nomi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @ApiProperty({
    example: "info",
    description: "extra info",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @ApiProperty({
    example: "info",
    description: "extra info",
  })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare headDoctorId: number;

  @BelongsTo(() => Doctor)
  headDoctor: Doctor;

  @HasMany(() => Staff)
  Labtests: Staff[];
}
