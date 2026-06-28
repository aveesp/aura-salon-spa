// DTO for creating an appointment
export class CreateAppointmentDto {
  serviceId!: string;
  stylistId?: string;
  date!: string;
  time!: string;
  name!: string;
  email!: string;
  phone!: string;
  notes?: string;
}
