import { Injectable } from "@nestjs/common";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription)
    private readonly prescriptionModel: typeof Prescription
  ) {}
  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionModel.create(createPrescriptionDto)
  }

  findAll() {
    return this.prescriptionModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.prescriptionModel.findByPk(id)
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.update(updatePrescriptionDto,{where:{id},returning:true})
  }

 async remove(id: number) {
    const appointment = await this.prescriptionModel.destroy({ where: { id } });
    if (appointment > 0) {
      return { message: "Prescription seccessfully deleted" };
    }
    return { message: "Prescription not found" };
  }
}
