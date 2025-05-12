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
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Room } from "./models/room.model";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiBearerAuth()
@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Room,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "superadmin", "staff")
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Rooms",
    type: [Room],
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "superadmin", "staff", "doctor")
  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Room",
    type: Room,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "superadmin", "staff", "doctor")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Room",
    type: Room,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("admin", "superadmin", "staff")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Room",
    type: Room,
  })
  @UseGuards(UserGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomService.remove(+id);
  }
}
