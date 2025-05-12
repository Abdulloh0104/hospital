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
import { LabTestService } from "./lab-test.service";
import { CreateLabTestDto } from "./dto/create-lab-test.dto";
import { UpdateLabTestDto } from "./dto/update-lab-test.dto";
import { LabTest } from "./models/lab-test.model";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { UserGuard } from "../common/guards/user.guard";

@ApiBearerAuth()
@Controller("lab-test")
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "doctor", "staff")
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: LabTest,
  })
  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestService.create(createLabTestDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of LabTests",
    type: [LabTest],
  })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.labTestService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "LabTest",
    type: LabTest,
  })
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.labTestService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update LabTest",
    type: LabTest,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "doctor", "staff")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestService.update(+id, updateLabTestDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete LabTest",
    type: LabTest,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "doctor", "staff")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.labTestService.remove(+id);
  }
}
