import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateLabTestDto {
  @ApiProperty({
    example: "Qon turini aniqlash",
    description: "find Blood type",
  })
  @IsString()
  testName: string;

  @ApiProperty({
    example: "Standart labaratoriya natijasi",
    description: "standart labaratory result",
  })
  @IsString()
  normalRange: string;

  @ApiProperty({
    example: "Labaratoriya natijasi",
    description: "Labaratory result",
  })
  @IsString()
  result: string;

  @ApiProperty({
    example: "Labaratoriya hoqida",
    description: "About labaratory",
  })
  @IsString()
  notes: string;

  @ApiProperty({
    example: "3",
    description: "Labaratory Doctor Id",
  })
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    example: "Labaratoriya bemori",
    description: "Labaratory patient Id",
  })
  @IsNumber()
  patientId: number;
}
