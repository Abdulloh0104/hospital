import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Appointment } from "./models/appointment.model";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiBearerAuth()
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Appointment,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor")
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Appointments",
    type: [Appointment],
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor", "patient")
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Appointment",
    type: Appointment,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor", "patient")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Appointment",
    type: Appointment,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("doctor", "staff")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Appointment",
    type: Appointment,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff", "doctor")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentService.remove(+id);
  }
}
