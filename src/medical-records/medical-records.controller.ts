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
import { MedicalRecordsService } from "./medical-records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MedicalRecord } from "./models/medical-record.model";

@ApiBearerAuth()
@Controller("medical-record")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: MedicalRecord,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff")
  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of MedicalRecord",
    type: [MedicalRecord],
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff", "doctor")
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "MedicalRecord",
    type: MedicalRecord,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update MedicalRecord",
    type: MedicalRecord,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete MedicalRecord",
    type: MedicalRecord,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "staff")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
