import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({
    example: "200",
    description: "price",
  })
  amount: number;

  @ApiProperty({
    example: "2025-05-15",
    description: "Date",
  })
  datetime: Date;

  @ApiProperty({
    example: "cash",
    description: "payment type",
  })
  type: string;

  @ApiProperty({
    example: "paid",
    description: "price",
  })
  status: string;

  @ApiProperty({
    example: "3",
    description: "Id number of Patient",
  })
  patientId: number;

  @ApiProperty({
    example: "4",
    description: "Id number of Appointent",
  })
  appointmentId: number;
}
