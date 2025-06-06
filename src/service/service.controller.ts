import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './models/service.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Service,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Services",
    type: [Service],
  })
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Service",
    type: Service,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Service",
    type: Service,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Service",
    type: Service,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceService.remove(+id);
  }
}
