export class CreateMedicalRecordDto {
  visitday: Date;
  backDay: Date;
  description: string;
  desease: string;
  treatment: string;
  appointmentId: number;
  roomId: number;
}
