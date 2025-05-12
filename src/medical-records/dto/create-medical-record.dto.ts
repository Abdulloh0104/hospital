import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: "2025-05-10",
    description: "first Day",
  })
  @IsDateString()
  visitday: Date;

  @ApiProperty({
    example: "2025-06-10",
    description: "last Day",
  })
  @IsDateString()
  backDay: Date;

  @ApiProperty({
    example: "Info",
    description: "Extra information",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "Yo'tal",
    description: "Illness information",
  })
  @IsString()
  desease: string;

  @ApiProperty({
    example: "Drugs",
    description: "Treatment information",
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    example: "4",
    description: "Id number of Appointent",
  })
  @IsNumber()
  appointmentId: number;

  @ApiProperty({
    example: "3",
    description: "Id number of Room",
  })
  @IsNumber()
  roomId: number;
}
