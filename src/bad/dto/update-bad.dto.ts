import { PartialType } from '@nestjs/swagger';
import { CreateBadDto } from './create-bad.dto';

export class UpdateBadDto extends PartialType(CreateBadDto) {}
