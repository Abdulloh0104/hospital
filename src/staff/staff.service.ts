import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff) {}
  async create(createStaffDto: CreateStaffDto) {
    const { password, confirm_password } = createStaffDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.staffModel.create({
      ...createStaffDto,
      password: hashed_password,
    });
    return { message: `New ${newUser.role} added`, newUser };
  }

  findAll() {
    return this.staffModel.findAll({ include: { all: true } });
  }

  findStaffByEmail(email: string) {
    return this.staffModel.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id);
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
      const user = await this.staffModel.findByPk(id);
      if (!user || !user.password) {
        throw new NotFoundException("user not found");
      }
  
      const { password, newPassword, confirm_password } = updatePasswordDto;
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new BadRequestException("Forbidden");
      }
  
      if (newPassword !== confirm_password) {
        throw new BadRequestException("Parollar mos emas");
      }
      const hashed_password = await bcrypt.hash(newPassword, 7);
     await this.staffModel.update(
       {
         ...user,
         password: hashed_password,
       },
       { where: { id }, returning: true }
     );
      user.save()
      return { message: "Doctor password was changed"};
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

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.staffModel.update(
      { hashed_refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }
}
