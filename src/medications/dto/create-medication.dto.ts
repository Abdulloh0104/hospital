import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({
    example: "Mukaltin",
    description: "Name of Drug",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "2025-05-10",
    description: "make time",
  })
  @IsDateString()
  madeDate: Date;

  @ApiProperty({
    example: "2025-010-10",
    description: "expiry date",
  })
  @IsDateString()
  expiryDate: Date;

  @ApiProperty({
    example: "20000",
    description: "price of Drug",
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    example: "50",
    description: "Number of Drug",
  })
  @IsNumber()
  emount: number;
  
  @ApiProperty({
    example: "Info",
    description: "Usega information",
  })
  @IsString()
  description: string;
}
