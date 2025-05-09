import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';

@Injectable()
export class MedicalRecordsService {
    constructor(@InjectModel(MedicalRecord) private readonly medicRecModel:typeof MedicalRecord){}
  
  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicRecModel.create(createMedicalRecordDto)
  }

  findAll() {
    return this.medicRecModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.medicRecModel.findByPk(id) }

  update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicRecModel.update(updateMedicalRecordDto,{where:{id},returning:true})
  }

 async remove(id: number) {
     const deleted = await this.medicRecModel.destroy({ where: { id } });
     if (deleted > 0) {
       return { message: `${id}-medication record was deleted` };
     }
     return { message: `Medication record was not found` };
  }
}
