// NestJS Services Controller
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly svc: ServicesService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.svc.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }
}
