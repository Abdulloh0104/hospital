import { Injectable } from "@nestjs/common";
import { CreateBadDto } from "./dto/create-bad.dto";
import { UpdateBadDto } from "./dto/update-bad.dto";
import { Bad } from "./models/bad.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BadService {
  constructor(@InjectModel(Bad) private readonly badModel: typeof Bad) {}
  create(createBadDto: CreateBadDto) {
    return this.badModel.create(createBadDto);
  }

  findAll() {
    return this.badModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.badModel.findByPk(id);
  }

  update(id: number, updateBadDto: UpdateBadDto) {
    return this.badModel.update(updateBadDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.badModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-bad was deleted successfully` };
    }
    return { message: `bad not found` };
  }
}
