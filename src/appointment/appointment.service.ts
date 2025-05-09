import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { ServiceService } from "../service/service.service";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
    private readonly serviceService: ServiceService
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment =
      await this.appointmentModel.create(createAppointmentDto);
    const service = await this.serviceService.findByName(
      createAppointmentDto.service
    );
    if (!service) {
      throw new NotFoundException("Bunday service topilmadi");
    }
    await newAppointment.$set("services", [service.id]); // serviceAppointment table
    newAppointment.services = [service];
    await newAppointment.save();
    return newAppointment;
  }

  findAll() {
    return this.appointmentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.appointmentModel.findByPk(id);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentModel.update(updateAppointmentDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const appointment = await this.appointmentModel.destroy({ where: { id } });
    if (appointment > 0) {
      return { message: "Appointment seccessfully deleted" };
    }
    return { message: "Appointment not found" };
  }
}
