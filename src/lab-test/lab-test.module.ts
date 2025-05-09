import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { LabTestController } from './lab-test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';

@Module({
  imports:[SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestController],
  providers: [LabTestService],
})
export class LabTestModule {}
