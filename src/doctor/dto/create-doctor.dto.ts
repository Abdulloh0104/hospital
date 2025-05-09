import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
  @ApiProperty({
    example: "Olim",
    description: "Doctor name",
  })
  firstName: string;

  @ApiProperty({
    example: "Botirov",
    description: "Doctor surname",
  })
  lastName: string;

  @ApiProperty({
    example: "901234567",
    description: "doctor mobile phone number",
  })
  phoneNumber: string;

  @ApiProperty({
    example: "doctor@gmail.com",
    description: "doctor email account",
  })
  email: string;

  @ApiProperty({
    example: "doctor paroli",
    description: "doctor password",
  })
  password: string;

  @ApiProperty({
    example: "doctor paroli rewrite",
    description: "doctor password rewrite",
  })
  confirmationPassword: string;

  @ApiProperty({
    example: "1",
    description: "patient blood type",
  })
  bloodType: string;

  @ApiProperty({
    example: "doctor sertificati",
    description: "doctor info",
  })
  sertificate: string;

  @ApiProperty({
    example: "doctor bilim darajasi",
    description: "level of doctor",
  })
  level: string;

  @ApiProperty({
    example: "doctor mutahassisligi",
    description: "doctor majority",
  })
  specialization: string;

  @ApiProperty({
    example: "doctor maoshi",
    description: "doctor salary",
  })
  salary: string;
}
