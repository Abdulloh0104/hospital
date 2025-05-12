import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { Service } from "./service.model";

interface IServiceAppointmentCreationAttr {
  appointmentId: number;
  serviceId: number;
}

@Table({ tableName: "appointmentservice", timestamps: false })
export class ServiceAppointment extends Model<
  ServiceAppointment,
  IServiceAppointmentCreationAttr
> {
  @ApiProperty({
    example: "2",
    description: "Appointment Id number",
  })
  @ForeignKey(() => Appointment)
  @Column({ type: DataType.INTEGER })
  declare appointmentId: number;

  @ApiProperty({
    example: "2",
    description: "Service Id number",
  })
  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  declare serviceId: number;
}
