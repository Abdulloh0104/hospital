import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, confirm_password } = createDoctorDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.doctorModel.create({
      ...createDoctorDto,
      password: hashed_password,
    });
    return { message: "New doctor added", newUser };
  }

  findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  findDoctorByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id);
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.doctorModel.findByPk(id);
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
   await this.doctorModel.update(
      {
        ...user,
        password: hashed_password,
      },
      { where: { id }, returning: true }
    );
    user.save()
    return { message: "Doctor password was changed"};
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.doctorModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-doctor was deleted successfully` };
    }
    return { message: `Doctor not found` };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.doctorModel.update(
      { hashed_refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }
}
