import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePrescriptionDto {
  @ApiProperty({
    example: "70",
    description: "Amount",
  })
  @IsString()
  dosage: string;

  @ApiProperty({
    example: "15/160",
    description: "3 mahal",
  })
  @IsString()
  duration: string;

  @ApiProperty({
    example: "Kottalaga",
    description: "2 tadan",
  })
  @IsString()
  frequency: string;

  @ApiProperty({
    example: "8",
    description: "Id number of medication",
  })
  @IsNumber()
  medicationId: number;

  @ApiProperty({
    example: "5",
    description: "Id number of medical record",
  })
  @IsNumber()
  medicalRecordId: number;
}
