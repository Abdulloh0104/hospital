import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Department } from "../../department/models/department.model";

interface IStaffcreationAttr {
  name: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: number;
}

@Table({ tableName: "staff", timestamps: true })
export class Staff extends Model<Staff, IStaffcreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Bahodir",
    description: "Familiya",
  })
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @ApiProperty({
    example: "admin",
    description: "roli",
  })
  @Column({
    type: DataType.ENUM("creator", "admin", "drugMaker","staff"),
  })
  declare role: string;

  @ApiProperty({
    example: "test@gamil.com",
    description: "email",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({
    example: "121dsdw5",
    description: "parol",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "901234567",
    description: "phoone Number",
  })
  @Column({
    type: DataType.STRING,
  })
  declare phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_refresh_token: string;

  @ApiProperty({
    example: "3",
    description: "Id number of Department",
  })
  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare departmentId: number;

  @BelongsTo(() => Department)
  department: Department;
}
