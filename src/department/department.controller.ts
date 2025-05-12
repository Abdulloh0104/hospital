import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './models/department.model';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Department,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Departments",
    type: [Department],
  })
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Department",
    type: Department,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.departmentService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Department",
    type: Department,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Department",
    type: Department,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.departmentService.remove(+id);
  }
}
