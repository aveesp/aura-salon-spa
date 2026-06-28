// NestJS Appointments Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { v4 as uuid } from 'uuid';

export interface Appointment {
  id: string;
  serviceId: string;
  stylistId?: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
}

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [];

  create(dto: CreateAppointmentDto): Appointment {
    const appt: Appointment = {
      id: uuid(),
      ...dto,
      status: 'confirmed',
      createdAt: new Date(),
    };
    this.appointments.push(appt);
    return appt;
  }

  findAll(): Appointment[] { return this.appointments; }

  findOne(id: string): Appointment {
    const appt = this.appointments.find(a => a.id === id);
    if (!appt) throw new NotFoundException(`Appointment ${id} not found`);
    return appt;
  }

  cancel(id: string): Appointment {
    const appt = this.findOne(id);
    appt.status = 'cancelled';
    return appt;
  }
}
