import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({
    example: "Makro",
    description: "Bino nomi",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "3",
    description: "Doctor Id number",
  })
  @IsString()
  description: string;
  
  @ApiProperty({
    example: "3",
    description: "Doctor Id number",
  })
  @IsNumber()
  headDoctorId: number;
}
