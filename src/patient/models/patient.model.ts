import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { Payment } from "../../payment/models/payment.model";
import { LabTest } from "../../lab-test/models/lab-test.model";

interface IPatientCreationAttr {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  description: string;
  bloodType: string;
  birthdate: Date;
  gender: string;
}

@Table({ tableName: "patient", timestamps: false })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ortiq",
    description: "patient name",
  })
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  declare firstName: string;

  @ApiProperty({
    example: "Botirov",
    description: "patient surname",
  })
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  declare lastName: string;

  @ApiProperty({
    example: "901234567",
    description: "patient mobile phone number",
  })
  @Column({
    type: DataType.STRING(15),
  })
  declare phoneNumber: string;

  @ApiProperty({
    example: "bemor@gmail.com",
    description: "patient email account",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({
    example: "bemor paroli",
    description: "patient password",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "bemor haqida qo'shimcha ma'lumot",
    description: "extra info about patient",
  })
  @Column({
    type: DataType.TEXT(),
  })
  declare description: string;

  @ApiProperty({
    example: "1",
    description: "patient blood type",
  })
  @Column({
    type: DataType.ENUM("1", "2", "3", "4"),
  })
  declare bloodType: string;

  @ApiProperty({
    example: "2003-02-01",
    description: "Quruvchi tug'ulgan sanasi",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare birthdate: Date;

  @ApiProperty({
    example: "male",
    description: "patient is male or female",
  })
  @Column({
    type: DataType.ENUM("male", "female"),
  })
  declare gender: string;

  @Column({
    type: DataType.STRING,
  })
  declare activationLink: string;

  @Column({
    type: DataType.STRING,
  })
  declare refreshToken: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => LabTest)
  Labtests: LabTest[];
}
