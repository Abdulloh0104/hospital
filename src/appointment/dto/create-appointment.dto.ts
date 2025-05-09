import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    example: "2025-05-10",
    description: "meeting time",
  })
  @IsDateString()
  datetime: Date;

  @ApiProperty({
    example: "cancelled",
    description: "meeting time is cancelled",
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: "consultation",
    description: "meeting",
  })
  @IsString()
  types: string;

  @ApiProperty({
    example: "information",
    description: "information about parient health",
  })
  @IsString()
  notes: string;

  @ApiProperty({
    example: "3",
    description: "Id number of doctor",
  })
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    example: "3",
    description: "Id number of Room",
  })
  @IsNumber()
  roomId: number;

  @ApiProperty({
    example: "3",
    description: "Id number of Patient",
  })
  @IsNumber()
  patientId: number;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty({
    example: "emergency",
    description: "xizmat turi",
  })
  service: string;
}
