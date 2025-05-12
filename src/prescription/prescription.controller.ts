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
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Prescription } from "./models/prescription.model";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiBearerAuth()
@Controller("prescription")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Prescription",
    type: Prescription,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("doctor")
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Prescription",
    type: [Prescription],
  })
  @Get()
  @UseGuards(UserGuard, RolesGuard)
  @Roles("doctor", "patient", "admin", "superadmin")
  findAll() {
    return this.prescriptionService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Prescription",
    type: Prescription,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("doctor", "patient", "admin", "superadmin")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.prescriptionService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Prescription",
    type: Prescription,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("doctor")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Prescription",
    type: Prescription,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prescriptionService.remove(+id);
  }
}
