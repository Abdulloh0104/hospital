import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { ServiceAppointment } from "./serviceAppointment.model";
import { IsNumber, IsString } from "class-validator";

interface IServiceCreationAttr {
  name: string;
  description: string;
  price: number;
}

@Table({ tableName: "service", timestamps: false })
export class Service extends Model<Service, IServiceCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Tez yordam",
    description: "service name",
  })
  @Column({
    type: DataType.STRING(50),
  })
  @IsString()
  declare name: string;

  @ApiProperty({
    example: "xizmat haqida qo'shimcha ma'lumot",
    description: "extra info about service",
  })
  @Column({
    type: DataType.STRING(50),
  })
  @IsString()
  declare description: string;

  @ApiProperty({
    example: "xizmat haqqi",
    description: "service price",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  @IsNumber()
  declare price: number;

  @BelongsToMany(() => Appointment, () => ServiceAppointment)
  meetings: Appointment[];
}
