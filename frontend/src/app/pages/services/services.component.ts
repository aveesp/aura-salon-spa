import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { Service, ServiceCategory } from '../../core/models';

interface Category { key: string; label: string; icon: string; }

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SectionHeaderComponent],
  template: `
<!-- Hero -->
<section class="relative h-72 md:h-96 flex items-end pb-12 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
    alt="Services" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <p class="font-accent text-gold text-xl mb-2">What We Offer</p>
    <h1 class="font-serif text-5xl md:text-6xl text-white">Our Services</h1>
    <nav class="flex gap-2 mt-4 font-sans text-sm text-white/60">
      <a routerLink="/" class="hover:text-white">Home</a>
      <span>/</span>
      <span class="text-gold">Services</span>
    </nav>
  </div>
</section>

<!-- Sticky categories + search -->
<div class="sticky top-20 z-30 bg-white/95 backdrop-blur-md shadow-luxury py-4">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <!-- Category pills -->
      <div class="flex gap-2 flex-wrap">
        @for (cat of categories; track cat.key) {
          <button (click)="activeCategory.set(cat.key)"
            class="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 border"
            [class.bg-gradient-gold]="activeCategory() === cat.key"
            [class.text-white]="activeCategory() === cat.key"
            [class.border-transparent]="activeCategory() === cat.key"
            [class.shadow-gold]="activeCategory() === cat.key"
            [class.border-cream-300]="activeCategory() !== cat.key"
            [class.text-charcoal]="activeCategory() !== cat.key">
            <span class="material-icons-round text-xs">{{ cat.icon }}</span>
            {{ cat.label }}
          </button>
        }
      </div>
      <!-- Search -->
      <div class="flex items-center gap-2 px-4 py-2.5 bg-cream-100 rounded-xl border border-cream-300 w-full md:w-64">
        <span class="material-icons-round text-gold text-sm">search</span>
        <input [(ngModel)]="searchQuery" placeholder="Search services…"
          class="bg-transparent flex-1 font-sans text-sm text-charcoal placeholder:text-charcoal/40 outline-none" />
      </div>
    </div>
  </div>
</div>

<!-- Services grid -->
<section class="py-16 bg-cream-100 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    @if (filteredServices().length === 0) {
      <div class="text-center py-24">
        <span class="material-icons-round text-6xl text-cream-300 mb-4">search_off</span>
        <h3 class="font-serif text-2xl text-charcoal mb-2">No services found</h3>
        <p class="font-sans text-charcoal/50">Try a different search or category.</p>
      </div>
    } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (svc of filteredServices(); track svc.id) {
          <div class="card-luxury group flex flex-col">
            <div class="relative overflow-hidden h-56">
              <img [src]="svc.image" [alt]="svc.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 flex gap-2">
                @if (svc.popular) {
                  <span class="badge-gold text-xs">★ Popular</span>
                }
                @for (tag of svc.tags.slice(0,1); track tag) {
                  <span class="badge-blush text-xs">{{ tag }}</span>
                }
              </div>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <span class="font-sans text-xs text-charcoal/40 uppercase tracking-widest mb-1">{{ categoryLabel(svc.category) }}</span>
              <h3 class="font-serif text-xl text-charcoal mb-2">{{ svc.name }}</h3>
              <p class="font-sans text-sm text-charcoal/60 line-clamp-3 leading-relaxed flex-1 mb-4">{{ svc.description }}</p>
              <div class="flex items-center gap-3 mb-4 pb-4 border-b border-cream-200">
                <div class="flex items-center gap-1 text-charcoal/50">
                  <span class="material-icons-round text-sm">schedule</span>
                  <span class="font-sans text-xs">{{ svc.duration }} min</span>
                </div>
                <div class="flex-1 text-right">
                  <span class="font-sans text-xs text-charcoal/40">from</span>
                  <span class="price-tag ml-1">₹{{ svc.startingPrice }}</span>
                </div>
              </div>
              <a routerLink="/booking"
                [queryParams]="{ service: svc.id }"
                class="btn-primary w-full justify-center text-xs py-2.5">
                <span class="material-icons-round text-sm">calendar_month</span>
                Book Now
              </a>
            </div>
          </div>
        }
      </div>
    }
  </div>
</section>

<!-- Package upsell banner -->
<section class="py-16 bg-charcoal">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <p class="section-tag mb-3">Bundle & Save</p>
    <h2 class="font-serif text-4xl text-white mb-4">Try Our Luxury Spa Packages</h2>
    <p class="font-sans text-cream-300/70 text-lg mb-8 max-w-2xl mx-auto">Combine multiple treatments into a curated spa journey and save up to 30% compared to individual bookings.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a routerLink="/booking" class="btn-primary text-sm">View Packages & Book</a>
      <a routerLink="/membership" class="btn-outline text-sm border-white/30 text-white hover:bg-white hover:text-charcoal">Explore Membership</a>
    </div>
  </div>
</section>
  `,
})
export class ServicesComponent {
  private ds = inject(SalonDataService);
  services = this.ds.getServices();

  activeCategory = signal('all');
  searchQuery = '';

  categories: Category[] = [
    { key: 'all', label: 'All Services', icon: 'auto_awesome' },
    { key: 'hair', label: 'Hair', icon: 'content_cut' },
    { key: 'skin', label: 'Skin & Face', icon: 'face_retouching_natural' },
    { key: 'massage', label: 'Massage', icon: 'spa' },
    { key: 'spa', label: 'Spa', icon: 'local_florist' },
    { key: 'nails', label: 'Nails', icon: 'back_hand' },
    { key: 'makeup', label: 'Makeup', icon: 'brush' },
    { key: 'men', label: "Men's", icon: 'face' },
    { key: 'kids', label: 'Kids', icon: 'child_care' },
  ];

  filteredServices = computed(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery.toLowerCase();
    return this.services.filter(s =>
      (cat === 'all' || s.category === cat) &&
      (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    );
  });

  categoryLabel(key: string): string {
    return this.categories.find(c => c.key === key)?.label ?? key;
  }
}
