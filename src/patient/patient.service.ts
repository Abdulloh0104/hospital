import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient
  ) {}
  create(createPatientDto: CreatePatientDto) {
    return this.patientModel.create(createPatientDto);
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findPatientByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.patientModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-patient was deleted successfully` };
    }
    return { message: `Patient not found` };
  }
}
