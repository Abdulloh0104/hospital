import { Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff) {}
  create(createStaffDto: CreateStaffDto) {
    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id);
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.staffModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-staff was deleted successfully` };
    }
    return { message: `Staff not found` };
  }
}
