import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    example: "Tez yordam",
    description: "service name",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "xizmat haqida qo'shimcha ma'lumot",
    description: "extra info about service",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "xizmat haqqi",
    description: "service price",
  })
  @IsDecimal()
  price: number;
}
