import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TelegrafModule } from "nestjs-telegraf";
import { BotModule } from "./bot/bot.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientModule } from "./patient/patient.module";
import { Patient } from "./patient/models/patient.model";
import { BOT_NAME } from "./app.constance";
import { ServiceModule } from "./service/service.module";
import { Service } from "./service/models/service.model";
import { AppointmentModule } from "./appointment/appointment.module";
import { ServiceAppointment } from "./service/models/serviceAppointment.model";
import { Appointment } from "./appointment/models/appointment.model";
import { PaymentModule } from "./payment/payment.module";
import { Payment } from "./payment/models/payment.model";
import { DoctorModule } from "./doctor/doctor.module";
import { Doctor } from "./doctor/models/doctor.model";
import { LabTestModule } from "./lab-test/lab-test.module";
import { LabTest } from "./lab-test/models/lab-test.model";
import { MedicationsModule } from "./medications/medications.module";
import { Medication } from "./medications/models/medication.model";
import { RoomModule } from "./room/room.module";
import { Room } from "./room/models/room.model";
import { MedicalRecordsModule } from "./medical-records/medical-records.module";
import { MedicalRecord } from "./medical-records/models/medical-record.model";
import { PrescriptionModule } from "./prescription/prescription.module";
import { Prescription } from "./prescription/models/prescription.model";
import { StaffModule } from "./staff/staff.module";
import { Staff } from "./staff/models/staff.model";
import { DepartmentModule } from './department/department.module';
import { Department } from "./department/models/department.model";
import { BadModule } from './bad/bad.module';
import { Bad } from "./bad/models/bad.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middleweres: [],
        include: [BotModule],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Patient,
        Service,
        ServiceAppointment,
        Appointment,
        Payment,
        Doctor,
        LabTest,
        Medication,
        Room,
        MedicalRecord,
        Prescription,
        Staff,
        Department,
        Bad
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    PatientModule,
    ServiceModule,
    AppointmentModule,
    PaymentModule,
    DoctorModule,
    LabTestModule,
    MedicationsModule,
    RoomModule,
    MedicalRecordsModule,
    PrescriptionModule,
    StaffModule,
    DepartmentModule,
    BadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
