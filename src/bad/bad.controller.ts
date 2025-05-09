import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BadService } from './bad.service';
import { CreateBadDto } from './dto/create-bad.dto';
import { UpdateBadDto } from './dto/update-bad.dto';

@Controller('bad')
export class BadController {
  constructor(private readonly badService: BadService) {}

  @Post()
  create(@Body() createBadDto: CreateBadDto) {
    return this.badService.create(createBadDto);
  }

  @Get()
  findAll() {
    return this.badService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.badService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBadDto: UpdateBadDto) {
    return this.badService.update(+id, updateBadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.badService.remove(+id);
  }
}
