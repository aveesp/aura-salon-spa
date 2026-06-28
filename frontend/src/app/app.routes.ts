import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Aura Salon & Spa | Luxury Beauty Experience',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Our Services | Aura Salon & Spa',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery | Aura Salon & Spa',
  },
  {
    path: 'membership',
    loadComponent: () => import('./pages/membership/membership.component').then(m => m.MembershipComponent),
    title: 'Membership Plans | Aura Salon & Spa',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Aura Salon & Spa',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact | Aura Salon & Spa',
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
    title: 'Book Appointment | Aura Salon & Spa',
  },
  {
    path: 'salon/:id',
    loadComponent: () => import('./pages/salon-detail/salon-detail.component').then(m => m.SalonDetailComponent),
    title: 'Salon Detail | Aura Salon & Spa',
  },
  { path: '**', redirectTo: '' },
];
