import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LabTestService } from "./lab-test.service";
import { CreateLabTestDto } from "./dto/create-lab-test.dto";
import { UpdateLabTestDto } from "./dto/update-lab-test.dto";
import { LabTest } from "./models/lab-test.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("lab-test")
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

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
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.labTestService.remove(+id);
  }
}
