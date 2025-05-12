import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({
    example: "Olim",
    description: "Doctor name",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Botirov",
    description: "Doctor surname",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: "901234567",
    description: "doctor mobile phone number",
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: "doctor@gmail.com",
    description: "doctor email account",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "doctor paroli",
    description: "doctor password",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "doctor paroli rewrite",
    description: "doctor password rewrite",
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: "1",
    description: "patient blood type",
  })
  @IsString()
  bloodType: string;

  @ApiProperty({
    example: "doctor sertificati",
    description: "doctor info",
  })
  @IsString()
  sertificate: string;

  @ApiProperty({
    example: "doctor bilim darajasi",
    description: "level of doctor",
  })
  @IsString()
  level: string;

  @ApiProperty({
    example: "doctor mutahassisligi",
    description: "doctor majority",
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    example: "doctor maoshi",
    description: "doctor salary",
  })
  @IsNumber()
  salary: number;
}
