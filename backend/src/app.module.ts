import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { SalonServicesModule } from './services/services.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [AppointmentsModule, SalonServicesModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
