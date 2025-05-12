import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateBadDto {
  @ApiProperty({
    example: "true",
    description: "Is room empty",
  })
  isAmpty: boolean;
  @ApiProperty({
    example: "8",
    description: "Id number of room",
  })
  @IsNumber()
  roomId: number;
}
