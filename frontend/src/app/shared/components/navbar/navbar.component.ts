import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalonDataService } from '../../../core/services/salon-data.service';

interface NavItem { label: string; route: string; exact?: boolean; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  [class.bg-white]="scrolled()"
  [class.shadow-luxury]="scrolled()"
  [class.bg-transparent]="!scrolled()"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a routerLink="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-110">
          <span class="text-white font-serif text-lg font-bold leading-none">A</span>
        </div>
        <div class="flex flex-col leading-none">
          <span class="font-serif text-xl font-semibold tracking-wide"
            [class.text-white]="!scrolled()" [class.text-charcoal]="scrolled()">Aura</span>
          <span class="font-sans text-xs tracking-[0.2em] uppercase"
            [class.text-white-70]="!scrolled()" [class.text-charcoal-50]="scrolled()">Salon & Spa</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden lg:flex items-center gap-8">
        @for (item of navItems; track item.route) {
          <li>
            <a [routerLink]="item.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="item.exact ? {exact: true} : {exact: false}"
              class="nav-link text-sm"
              [class.text-white]="!scrolled()"
              [class.text-charcoal]="scrolled()">
              {{ item.label }}
            </a>
          </li>
        }
      </ul>

      <!-- Actions -->
      <div class="hidden lg:flex items-center gap-3">
        <!-- Dark mode -->
        <button (click)="ds.toggleDarkMode()"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
          [class.text-white]="!scrolled()" [class.text-charcoal]="scrolled()"
          aria-label="Toggle dark mode">
          <span class="material-icons-round text-xl">{{ ds.darkMode() ? 'light_mode' : 'dark_mode' }}</span>
        </button>
        <a routerLink="/booking" class="btn-primary text-xs py-2.5 px-6">
          <span class="material-icons-round text-sm">calendar_month</span>
          Book Now
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button (click)="mobileOpen.set(!mobileOpen())"
        class="lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors"
        [class.text-white]="!scrolled()" [class.text-charcoal]="scrolled()"
        aria-label="Toggle menu">
        <span class="block w-6 h-0.5 bg-current transition-all duration-300"
          [class.rotate-45]="mobileOpen()" [class.translate-y-2]="mobileOpen()"></span>
        <span class="block w-5 h-0.5 bg-current transition-all duration-300"
          [class.opacity-0]="mobileOpen()"></span>
        <span class="block w-6 h-0.5 bg-current transition-all duration-300"
          [class.-rotate-45]="mobileOpen()" [class.-translate-y-2]="mobileOpen()"></span>
      </button>
    </nav>
  </div>

  <!-- Mobile Menu -->
  @if (mobileOpen()) {
    <div class="lg:hidden bg-white border-t border-cream-200 shadow-luxury animate-fade-in">
      <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
        @for (item of navItems; track item.route) {
          <a [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="item.exact ? {exact: true} : {exact: false}"
            (click)="mobileOpen.set(false)"
            class="px-4 py-3 rounded-xl font-sans text-sm font-medium text-charcoal hover:bg-cream-200 hover:text-gold transition-colors duration-200">
            {{ item.label }}
          </a>
        }
        <div class="mt-3 pt-3 border-t border-cream-200">
          <a routerLink="/booking" (click)="mobileOpen.set(false)" class="btn-primary w-full justify-center">
            <span class="material-icons-round text-sm">calendar_month</span>
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  }
</header>
  `,
})
export class NavbarComponent {
  ds = inject(SalonDataService);
  scrolled = signal(false);
  mobileOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'Services', route: '/services' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Membership', route: '/membership' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 40); }
}
