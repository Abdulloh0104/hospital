import { Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Service } from "./models/service.model";

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service) private readonly serviceModel: typeof Service
  ) {}
  create(createServiceDto: CreateServiceDto) {
    return this.serviceModel.create({
      ...createServiceDto,
      name: createServiceDto.name.toUpperCase(),
    });
  }

  findAll() {
    return this.serviceModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.serviceModel.findByPk(id);
  }

  findByName(value: string) {
    return this.serviceModel.findOne({ where: { name: value.toUpperCase() } });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceModel.update(
      { ...updateServiceDto, name: updateServiceDto.name?.toUpperCase() },
      {
        where: { id },
        returning: true,
      }
    );
  }

  async remove(id: number) {
    const deleted = await this.serviceModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-service was deleted` };
    }
    return { message: `Service was not found` };
  }
}
