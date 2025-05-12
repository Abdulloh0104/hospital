import { Module } from "@nestjs/common";
import { AuthPatientService } from "./patient/auth.service";
import { AuthPatientController } from "./patient/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PatientModule } from "../patient/patient.module";
import { DoctorModule } from "../doctor/doctor.module";
import { AuthDoctorController } from "./doctor/auth.controller";
import { AuthDoctorService } from "./doctor/auth.service";
import { StaffModule } from "../staff/staff.module";
import { AuthStaffService } from "./staff/auth.service";
import { AuthStaffController } from "./staff/auth.controller";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    DoctorModule,
    PatientModule,
    StaffModule,
  ],
  controllers: [
    AuthPatientController,
    AuthDoctorController,
    AuthStaffController,
  ],
  providers: [AuthPatientService, AuthDoctorService, AuthStaffService],
})
export class AuthModule {}
