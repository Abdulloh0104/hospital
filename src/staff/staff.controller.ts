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
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Staff } from "./models/staff.model";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Staff,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin")
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Staffes",
    type: [Staff],
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Staff",
    type: Staff,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("superadmin", "admin", "drugMaker", "staff")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Staff",
    type: Staff,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("superadmin", "admin", "drugMaker", "staff")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({ summary: "UPDATE Password" })
  @ApiResponse({
    status: 200,
    description: "Update Staff Password",
    type: Staff,
  })
  @UseGuards(UserGuard, JwtSelfGuard, RolesGuard)
  @Roles("superadmin", "admin", "drugMaker", "staff")
  @Post("password/:id")
  updatePassord(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.staffService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Staff",
    type: Staff,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }
}
