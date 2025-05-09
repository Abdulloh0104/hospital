import { Injectable } from "@nestjs/common";
import { CreateLabTestDto } from "./dto/create-lab-test.dto";
import { UpdateLabTestDto } from "./dto/update-lab-test.dto";
import { InjectModel } from "@nestjs/sequelize";
import { LabTest } from "./models/lab-test.model";

@Injectable()
export class LabTestService {
  constructor(
    @InjectModel(LabTest)
    private readonly labTestModel: typeof LabTest
  ) {}

  create(createLabTestDto: CreateLabTestDto) {
    return this.labTestModel.create(createLabTestDto);
  }

  findAll() {
    return this.labTestModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.labTestModel.findByPk(id)
  }

  update(id: number, updateLabTestDto: UpdateLabTestDto) {
    return this.labTestModel.update(updateLabTestDto,{where:{id},returning:true})
  }

 async remove(id: number) {
    const deleted = await this.labTestModel.destroy({
      where: { id },
    });
    if (deleted > 0) {
      return {
        message: "lab-test deleted seccessfully",
        deleted,
      };
    }
    return "Bunday lab-test mavjud emas";
  }
}
