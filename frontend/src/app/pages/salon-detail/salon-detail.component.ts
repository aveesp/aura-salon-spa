import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { Salon } from '../../core/models';

@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  template: `
@if (salon()) {
  <!-- Hero gallery -->
  <section class="relative h-96 md:h-screen/2 overflow-hidden">
    <img [src]="salon()!.images[0]" [alt]="salon()!.name"
      class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 p-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-2 mb-2">
          <span class="badge-gold">{{ salon()!.rating }}★</span>
          <span class="font-sans text-white/60 text-sm">{{ salon()!.reviewCount }} reviews</span>
        </div>
        <h1 class="font-serif text-4xl md:text-6xl text-white mb-1">{{ salon()!.name }}</h1>
        <p class="font-sans text-cream-100/80 text-lg">{{ salon()!.tagline }}</p>
      </div>
    </div>
  </section>

  <!-- Quick info bar -->
  <div class="bg-charcoal py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap gap-6 items-center justify-between">
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2 text-cream-100">
            <span class="material-icons-round text-gold text-sm">location_on</span>
            <span class="font-sans text-sm">{{ salon()!.address }}, {{ salon()!.city }}</span>
          </div>
          <div class="flex items-center gap-2 text-cream-100">
            <span class="material-icons-round text-gold text-sm">phone</span>
            <a [href]="'tel:' + salon()!.phone" class="font-sans text-sm hover:text-gold transition-colors">{{ salon()!.phone }}</a>
          </div>
          <div class="flex items-center gap-2 text-cream-100">
            <span class="material-icons-round text-gold text-sm">mail</span>
            <a [href]="'mailto:' + salon()!.email" class="font-sans text-sm hover:text-gold transition-colors">{{ salon()!.email }}</a>
          </div>
        </div>
        <a routerLink="/booking" class="btn-primary text-xs py-2.5">
          <span class="material-icons-round text-sm">calendar_month</span>
          Book Here
        </a>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-16">
        <!-- About -->
        <div>
          <h2 class="font-serif text-3xl text-charcoal mb-4">About This Salon</h2>
          <div class="divider-gold mb-6"></div>
          <p class="font-sans text-charcoal/70 leading-relaxed text-base">
            {{ salon()!.name }} is part of the award-winning Aura family, offering the full range of luxury hair, skin, and spa treatments. Our {{ salon()!.city }} location combines an intimate boutique feel with world-class facilities and our signature approach to personalised beauty.
          </p>
          <p class="font-sans text-charcoal/70 leading-relaxed text-base mt-4">
            Each visit is designed to be a complete sensory retreat — from the moment you step through our doors, you're immersed in an atmosphere of calm, elegance, and expert care.
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            @for (tag of salon()!.services; track tag) {
              <div class="text-center p-4 bg-cream-100 rounded-2xl">
                <span class="material-icons-round text-gold text-2xl mb-2 block">spa</span>
                <p class="font-sans text-xs font-semibold text-charcoal">{{ tag }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Services offered -->
        <div>
          <h2 class="font-serif text-3xl text-charcoal mb-4">Services & Pricing</h2>
          <div class="divider-gold mb-6"></div>
          <div class="space-y-3">
            @for (svc of services.slice(0, 8); track svc.id) {
              <div class="flex items-center justify-between py-4 border-b border-cream-200 hover:bg-cream-100 -mx-4 px-4 rounded-xl transition-colors duration-200 group">
                <div class="flex items-center gap-4">
                  <img [src]="svc.image" [alt]="svc.name" class="w-12 h-12 rounded-xl object-cover" loading="lazy" />
                  <div>
                    <h4 class="font-sans font-semibold text-charcoal group-hover:text-gold transition-colors">{{ svc.name }}</h4>
                    <p class="font-sans text-xs text-charcoal/50 flex items-center gap-1">
                      <span class="material-icons-round text-xs">schedule</span> {{ svc.duration }} min
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="price-tag">₹{{ svc.startingPrice }}</span>
                  <a routerLink="/booking" class="btn-primary text-xs py-1.5 px-4 hidden sm:inline-flex">Book</a>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Photo gallery -->
        <div>
          <h2 class="font-serif text-3xl text-charcoal mb-4">Photo Gallery</h2>
          <div class="divider-gold mb-6"></div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            @for (img of galleryImages; track img) {
              <div class="aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                <img [src]="img" alt="Gallery" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Working hours -->
        <div class="card-glass p-6">
          <h3 class="font-sans font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span class="material-icons-round text-gold text-base">schedule</span>
            Working Hours
          </h3>
          <div class="space-y-3">
            @for (h of salon()!.workingHours; track h.day) {
              <div class="flex justify-between items-center">
                <span class="font-sans text-sm text-charcoal/70">{{ h.day }}</span>
                <span class="font-sans text-sm font-medium"
                  [class.text-gold]="!h.closed" [class.text-charcoal-30]="h.closed">
                  {{ h.closed ? 'Closed' : h.open + ' – ' + h.close }}
                </span>
              </div>
            }
          </div>
        </div>

        <!-- Book CTA -->
        <div class="card-luxury p-6 text-center bg-gradient-gold">
          <span class="material-icons-round text-white text-4xl mb-3 block">calendar_month</span>
          <h3 class="font-serif text-2xl text-white mb-2">Ready to Visit?</h3>
          <p class="font-sans text-white/80 text-sm mb-5">Book online in minutes. Available 24/7.</p>
          <a routerLink="/booking" class="btn-white text-xs w-full justify-center">Reserve Your Spot</a>
        </div>

        <!-- Map -->
        <div class="rounded-2xl overflow-hidden shadow-card h-48 bg-cream-200 flex items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600" alt="Map"
            class="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
          <div class="relative text-center">
            <span class="material-icons-round text-gold text-3xl block mb-1">location_on</span>
            <p class="font-serif text-sm text-charcoal">{{ salon()!.address }}</p>
            <a href="#" class="font-sans text-xs text-gold mt-1 block hover:underline">Get Directions</a>
          </div>
        </div>
      </div>
    </div>
  </div>
}
  `,
})
export class SalonDetailComponent implements OnInit {
  private ds = inject(SalonDataService);
  private route = inject(ActivatedRoute);

  salon = signal<Salon | null>(null);
  services = this.ds.getServices();

  galleryImages = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? 'salon1';
    this.salon.set(this.ds.getSalons().find(s => s.id === id) ?? this.ds.getSalons()[0]);
  }
}
