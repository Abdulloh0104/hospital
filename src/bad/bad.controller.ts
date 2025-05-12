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
import { BadService } from "./bad.service";
import { CreateBadDto } from "./dto/create-bad.dto";
import { UpdateBadDto } from "./dto/update-bad.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Bad } from "./models/bad.model";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiBearerAuth()
@Controller("bad")
export class BadController {
  constructor(private readonly badService: BadService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Bad,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff")
  @Post()
  create(@Body() createBadDto: CreateBadDto) {
    return this.badService.create(createBadDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Bads",
    type: [Bad],
  })
  @Roles("admin","staff","doctor","superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.badService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Bad",
    type: Bad,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.badService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Bad",
    type: Bad,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBadDto: UpdateBadDto) {
    return this.badService.update(+id, updateBadDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Bad",
    type: Bad,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin", "admin", "staff", "doctor")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.badService.remove(+id);
  }
}
