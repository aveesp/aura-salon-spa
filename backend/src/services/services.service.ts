// NestJS Services Service — catalogue of all salon services
import { Injectable, NotFoundException } from '@nestjs/common';

export interface SalonService {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  startingPrice: number;
  image: string;
  popular?: boolean;
}

const SERVICES: SalonService[] = [
  { id: 's1', name: 'Classic Haircut', category: 'hair', description: 'Precision cut tailored to your face shape.', duration: 45, startingPrice: 65, image: '', popular: true },
  { id: 's2', name: 'Hair Styling', category: 'hair', description: 'From sleek blowouts to glamorous waves.', duration: 60, startingPrice: 85, image: '' },
  { id: 's3', name: 'Hair Coloring', category: 'hair', description: 'Balayage, highlights, ombré, and vivid colours.', duration: 120, startingPrice: 140, image: '', popular: true },
  { id: 's4', name: 'Hair Spa', category: 'hair', description: 'Deep conditioning treatment.', duration: 75, startingPrice: 95, image: '' },
  { id: 's5', name: 'Luxury Facial', category: 'skin', description: 'Customised facial for radiant skin.', duration: 90, startingPrice: 120, image: '', popular: true },
  { id: 's6', name: 'Deep Cleanup', category: 'skin', description: 'Pore-purifying cleansing ritual.', duration: 60, startingPrice: 75, image: '' },
  { id: 's7', name: 'Swedish Massage', category: 'massage', description: 'Full-body relaxation massage.', duration: 90, startingPrice: 110, image: '', popular: true },
  { id: 's8', name: 'Spa Package', category: 'spa', description: 'Curated spa journey — facial, massage & wrap.', duration: 180, startingPrice: 280, image: '' },
  { id: 's9', name: 'Body Treatment', category: 'spa', description: 'Exfoliating and hydrating body wrap.', duration: 75, startingPrice: 130, image: '' },
  { id: 's10', name: 'Full Waxing', category: 'skin', description: 'Smooth hair removal with premium wax.', duration: 60, startingPrice: 60, image: '' },
  { id: 's11', name: 'Threading', category: 'skin', description: 'Precise eyebrow and face threading.', duration: 20, startingPrice: 18, image: '' },
  { id: 's12', name: 'Pedicure', category: 'nails', description: 'Rejuvenating foot care and polish.', duration: 60, startingPrice: 55, image: '' },
  { id: 's13', name: 'Manicure', category: 'nails', description: 'Hand care with cuticle treatment and polish.', duration: 45, startingPrice: 45, image: '' },
  { id: 's14', name: 'Nail Art', category: 'nails', description: 'Creative designs on every nail.', duration: 90, startingPrice: 70, image: '' },
  { id: 's15', name: 'Bridal Makeup', category: 'makeup', description: 'Flawless bridal looks that last all day.', duration: 120, startingPrice: 250, image: '', popular: true },
  { id: 's16', name: 'Party Makeup', category: 'makeup', description: 'Event-ready makeup for any occasion.', duration: 75, startingPrice: 120, image: '' },
  { id: 's17', name: 'Beard Styling', category: 'men', description: 'Hot towel shave and beard sculpting.', duration: 45, startingPrice: 55, image: '' },
  { id: 's18', name: 'Kids Haircut', category: 'kids', description: 'Gentle haircuts for little ones.', duration: 30, startingPrice: 35, image: '' },
];

@Injectable()
export class ServicesService {
  findAll(category?: string): SalonService[] {
    if (!category || category === 'all') return SERVICES;
    return SERVICES.filter(s => s.category === category);
  }

  findOne(id: string): SalonService {
    const svc = SERVICES.find(s => s.id === id);
    if (!svc) throw new NotFoundException(`Service ${id} not found`);
    return svc;
  }
}
