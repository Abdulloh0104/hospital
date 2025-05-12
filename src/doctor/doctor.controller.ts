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
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./models/doctor.model";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@ApiBearerAuth()
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Doctor,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Doctors",
    type: [Doctor],
  })
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Doctor",
    type: Doctor,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("doctor")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Doctor",
    type: Doctor,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("doctor")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: "UPDATE Password" })
  @ApiResponse({
    status: 200,
    description: "Update Doctor Password",
    type: Doctor,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("doctor")
  @Post("password/:id")
  updatePassord(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.doctorService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Doctor",
    type: Doctor,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }
}
