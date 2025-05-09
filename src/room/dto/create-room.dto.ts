import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    example: "Xona raqami",
    description: "room number",
  })
  @IsNumber()
  roomNumber: number;

  @ApiProperty({
    example: "Xona info",
    description: "room",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "Xona info",
    description: "room",
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: "Xona info",
    description: "room",
  })
  @IsString()
  status: string;
}
