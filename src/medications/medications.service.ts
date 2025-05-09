import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Medication } from './models/medication.model';

@Injectable()
export class MedicationsService {
  constructor(@InjectModel(Medication) private readonly medicModel:typeof Medication){}
  create(createMedicationDto: CreateMedicationDto) {
    return this.medicModel.create(createMedicationDto)
  }

  findAll() {
    return this.medicModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.medicModel.findByPk(id)
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.medicModel.update(updateMedicationDto,{where:{id},returning:true})
  }

  async remove(id: number) {
    const deleted = await this.medicModel.destroy({where:{id}})
    if(deleted > 0){
      return {message:`${id}-medication was deleted`}
    }
      return { message: `Medication was not found` };
    
  }
}
