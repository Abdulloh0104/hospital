import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
  @ApiProperty({
    example: "Ortiq",
    description: "patient name",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Botiro",
    description: "patient surname",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: "901234567",
    description: "patient mobile phone number",
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: "bemor@gmail.com",
    description: "patient email account",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "bemor paroli",
    description: "patient password",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "bemor paroli",
    description: "write patient password eagin",
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: "bemor haqida qo'shimcha ma'lumot",
    description: "extra info about patient",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "1",
    description: "patient blood type",
  })
  @IsString()
  bloodType: string;

  @ApiProperty({
    example: "2003-02-01",
    description: "Quruvchi tug'ulgan sanasi",
  })
  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({
    example: "male",
    description: "patient is male or female",
  })
  @IsString()
  gender: string;
}
