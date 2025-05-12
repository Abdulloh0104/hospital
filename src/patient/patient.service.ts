import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    // console.log(21,typeof Patient);
    const newUser = await this.patientModel.create({
      ...createPatientDto,
      password: hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newUser;
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findPatientByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const deleted = await this.patientModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-patient was deleted successfully` };
    }
    return { message: `Patient not found` };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.patientModel.update(
      { hashed_refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatedUser = await this.patientModel.update(
      {
        is_active: true,
      },
      { where: { activation_link: link, is_active: false }, returning: true }
    );
    console.log(updatedUser[1][0]);
    if (!updatedUser[1][0]) {
      throw new BadRequestException("User already activated");
    }

    return {
      message: "User activated successfully",
      is_active: updatedUser[1][0].is_active,
    };
  }

  // async newOtp(phoneUserDto: PhoneUserDto) {
  //   const phone_number = phoneUserDto.phone;

  //   const otp = otpGenerator.generate(4, {
  //     upperCaseAlphabets: false,
  //     lowerCaseAlphabets: false,
  //     specialChars: false,
  //   });
  //   //--------------------BOT----------------------
  //   const isSend = await this.botService.sendOtp(phone_number, otp);
  //   if (!isSend) {
  //     throw new BadRequestException("Avval botdan ro'yxatdan o't");
  //   } else {
  //     // return {message:"OTP botga yuborildi"}
  //   }
  //   //--------------------SMS----------------------
  //   //--------------------EMAIL----------------------

  //   const now = new Date();
  //   const expiration_time = AddMinutesToDate(now, 5);
  //   await this.otpModel.destroy({ where: { phone_number } });
  //   const newOtpDate = await this.otpModel.create({
  //     id: uuid.v4(),
  //     otp,
  //     phone_number,
  //     expiration_time,
  //   });

  //   const details = {
  //     timestamp: now,
  //     phone_number,
  //     otp_id: newOtpDate.id,
  //   };

  //   const encodedDate = await encode(JSON.stringify(details));
  //   return {
  //     message: "OTP botga yuborildi",
  //     verification_key: encodedDate,
  //   };
  // }

  // async verifyOtp(verifyOtpDto: VerifyOtpDto) {
  //   const { verification_key, phone: phone_number, otp } = verifyOtpDto;

  //   const currentDate = new Date();
  //   const decodedData = await decode(verification_key);
  //   const details = JSON.parse(decodedData);
  //   if (details.phone_number != phone_number) {
  //     throw new BadRequestException("OTP bu raqamga yuborilmagan");
  //   }
  //   const resultOtp = await this.otpModel.findByPk(details.otp_id);

  //   if (resultOtp == null) {
  //     throw new BadRequestException("Bunday Otp yo'q");
  //   }
  //   if (resultOtp?.verified) {
  //     throw new BadRequestException("Bu Otp avval tekshirilgan");
  //   }
  //   if (resultOtp?.otp != otp) {
  //     throw new BadRequestException("Otp mos emas");
  //   }

  //   const user = await this.userModel.update(
  //     {
  //       is_owner: true,
  //     },
  //     {
  //       where: { phone: phone_number },
  //       returning: true,
  //     }
  //   );

  //   if (!user[1][0]) {
  //     throw new BadRequestException("Bunday raqamli foydalanuvchi yo'q");
  //   }

  //   await this.otpModel.update(
  //     { verified: true },
  //     { where: { id: details.otp_id } }
  //   );
  //   return {
  //     message: "Tabriklayman, siz owner bo'ldingiz",
  //   };
  // }
}
