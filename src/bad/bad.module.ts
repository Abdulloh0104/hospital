import { Module } from '@nestjs/common';
import { BadService } from './bad.service';
import { BadController } from './bad.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bad } from './models/bad.model';

@Module({
  imports:[SequelizeModule.forFeature([Bad])],
  controllers: [BadController],
  providers: [BadService],
})
export class BadModule {}
