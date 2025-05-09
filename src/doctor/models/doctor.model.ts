import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { LabTest } from "../../lab-test/models/lab-test.model";
import { Department } from "../../department/models/department.model";

interface IDoctorCreationAttr {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  bloodType: string;
  sertificate: string;
  level: string;
  specialization: string;
  salary: string;
}

@Table({ tableName: "doctor", createdAt: true, updatedAt: false })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Olim",
    description: "Doctor name",
  })
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  declare firstName: string;

  @ApiProperty({
    example: "Botirov",
    description: "Doctor surname",
  })
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  declare lastName: string;

  @ApiProperty({
    example: "901234567",
    description: "doctor mobile phone number",
  })
  @Column({
    type: DataType.STRING(15),
  })
  declare phoneNumber: string;

  @ApiProperty({
    example: "doctor@gmail.com",
    description: "doctor email account",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({
    example: "doctor paroli",
    description: "doctor password",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "1",
    description: "doctor blood type",
  })
  @Column({
    type: DataType.ENUM("1", "2", "3", "4"),
  })
  declare bloodType: string;

  @ApiProperty({
    example: "doctor sertificati",
    description: "doctor info",
  })
  @Column({
    type: DataType.STRING,
  })
  declare sertificate: string;

  @ApiProperty({
    example: "doctor bilim darajasi",
    description: "level of doctor",
  })
  @Column({
    type: DataType.STRING,
  })
  declare level: string;

  @ApiProperty({
    example: "doctor mutahassisligi",
    description: "doctor majority",
  })
  @Column({
    type: DataType.STRING,
  })
  declare specialization: string;

  @ApiProperty({
    example: "doctor maoshi",
    description: "doctor salary",
  })
  @Column({
    type: DataType.STRING,
  })
  declare salary: string;

  @Column({
    type: DataType.STRING,
  })
  declare refreshToken: string;

  @HasMany(() => LabTest)
  Labtests: LabTest[];

  @HasMany(() => Department)
  departments: Department[];
}
