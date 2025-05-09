import { Module } from "@nestjs/common";
import { AppointmentController } from "./appointment.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { ServiceAppointment} from "../service/models/serviceAppointment.model";
import { Service } from "../service/models/service.model";
import { ServiceModule } from "../service/service.module";
import { AppointmentService } from "./appointment.service";

@Module({
  imports: [SequelizeModule.forFeature([Appointment, ServiceAppointment,Service]),ServiceModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
