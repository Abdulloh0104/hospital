import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Patient } from "../patient/models/patient.model";
import { Doctor } from "../doctor/models/doctor.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(user: Patient) {
    const url = `${process.env.API_HOST}/api/patient/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Skidkachi App! ",
      template: "./confirmation",
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
