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
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Medication } from "./models/medication.model";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";

@Controller("medication")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Medication,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("drugMaker")
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Medications",
    type: [Medication],
  })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Medication",
    type: Medication,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicationsService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Medication",
    type: Medication,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("drugMaker")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Medication",
    type: Medication,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("drugMaker")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
