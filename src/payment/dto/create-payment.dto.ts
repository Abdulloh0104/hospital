import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: "200",
    description: "price",
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: "2025-05-15",
    description: "Date",
  })
  @IsDateString()
  datetime: Date;

  @ApiProperty({
    example: "cash",
    description: "payment type",
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: "paid",
    description: "price",
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: "3",
    description: "Id number of Patient",
  })
  @IsNumber()
  patientId: number;

  @ApiProperty({
    example: "4",
    description: "Id number of Appointent",
  })
  @IsNumber()
  appointmentId: number;
}
