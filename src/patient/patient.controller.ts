import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Patient } from "./models/patient.model";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Patient,
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Patients",
    type: [Patient],
  })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Patient",
    type: Patient,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("patient")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Patient",
    type: Patient,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("patient")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Patient",
    type: Patient,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("admin", "staff")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientService.activateUser(link);
  }
}
