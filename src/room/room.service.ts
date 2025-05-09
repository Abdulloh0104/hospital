import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Room } from "./models/room.model";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room) private readonly roomModel: typeof Room) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomModel.create(createRoomDto);
  }

  findAll() {
    return this.roomModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.roomModel.findByPk(id);
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.update(updateRoomDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.roomModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-room was deleted successfully` };
    }
    return { message: `Room not found` };
  }
}
