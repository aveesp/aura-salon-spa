import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  template: `
<!-- Hero -->
<section class="relative h-72 md:h-96 flex items-end pb-12 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80"
    alt="About Aura" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <p class="font-accent text-gold text-xl mb-2">Our Story</p>
    <h1 class="font-serif text-5xl md:text-6xl text-white">About Aura</h1>
  </div>
</section>

<!-- Story -->
<section class="py-24 bg-gradient-luxury">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <p class="section-tag mb-4">Est. 2009</p>
        <h2 class="section-title mb-6">A Legacy of Luxury Beauty</h2>
        <div class="divider-gold mb-6"></div>
        <div class="space-y-4 font-sans text-charcoal/70 text-base leading-relaxed">
          <p>Aura Salon & Spa was born from a simple belief: that every person deserves to feel extraordinary. Founded in 2009 by acclaimed stylist Sophia Laurent, what began as a small Chelsea boutique has grown into London's most celebrated luxury beauty destination.</p>
          <p>Over 15 years, we've built a sanctuary where artistry meets science — where our expert team of stylists, therapists, and beauty professionals work in harmony to craft experiences that go far beyond the ordinary.</p>
          <p>We've had the honour of styling clients for royal weddings, international fashion weeks, and editorial shoots. But our greatest achievement remains the confidence we help everyday clients discover each time they walk out of our doors.</p>
        </div>
        <div class="grid grid-cols-3 gap-6 mt-10">
          @for (stat of stats; track stat.label) {
            <div class="text-center">
              <p class="font-serif text-3xl text-gold font-semibold">{{ stat.value }}</p>
              <p class="font-sans text-xs text-charcoal/50 mt-1 uppercase tracking-widest">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500" alt="Salon interior"
          class="rounded-2xl object-cover h-64 w-full shadow-luxury" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500" alt="Hair styling"
          class="rounded-2xl object-cover h-64 w-full shadow-luxury mt-8" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500" alt="Spa treatment"
          class="rounded-2xl object-cover h-64 w-full shadow-luxury" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500" alt="Bridal"
          class="rounded-2xl object-cover h-64 w-full shadow-luxury mt-8" loading="lazy" />
      </div>
    </div>
  </div>
</section>

<!-- Awards -->
<section class="py-16 bg-charcoal">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header tag="Recognition" title="Awards & Accolades" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (award of awards; track award.title) {
        <div class="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors duration-300">
          <div class="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
            <span class="material-icons-round text-white text-2xl">{{ award.icon }}</span>
          </div>
          <h3 class="font-serif text-lg text-white mb-1">{{ award.title }}</h3>
          <p class="font-sans text-xs text-cream-300/60">{{ award.body }}</p>
          <p class="font-sans text-xs text-gold mt-1">{{ award.year }}</p>
        </div>
      }
    </div>
  </div>
</section>

<!-- Timeline -->
<section class="py-24 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header tag="Our Journey" title="Milestones" />
    <div class="relative">
      <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold to-gold/20 -translate-x-1/2"></div>
      <div class="space-y-12">
        @for (milestone of milestones; track milestone.year; let i = $index) {
          <div class="relative grid grid-cols-2 gap-8 items-center"
            [class.text-right]="i % 2 === 0">
            <div [class.order-last]="i % 2 !== 0" [class.pr-8]="i % 2 === 0" [class.pl-8]="i % 2 !== 0">
              <div class="card-glass p-5 hover:border-gold/20 transition-all duration-300"
                [class.ml-auto]="i % 2 === 0">
                <p class="font-serif text-lg text-gold mb-1">{{ milestone.year }}</p>
                <h3 class="font-sans font-semibold text-charcoal mb-2">{{ milestone.title }}</h3>
                <p class="font-sans text-sm text-charcoal/60 leading-relaxed">{{ milestone.desc }}</p>
              </div>
            </div>
            <div class="flex items-center" [class.justify-start]="i % 2 === 0" [class.justify-end]="i % 2 !== 0">
              <div class="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold border-4 border-white shadow-gold z-10"></div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Team -->
<section class="py-24 bg-cream-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="The People Behind the Magic"
      title="Meet Our Team"
      subtitle="A collective of passionate, internationally trained beauty professionals dedicated to your experience."
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (stylist of stylists; track stylist.id) {
        <div class="card-luxury group text-center">
          <div class="relative overflow-hidden h-72">
            <img [src]="stylist.image" [alt]="stylist.name"
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <a routerLink="/booking" class="btn-primary text-xs py-2 px-5">Book a Session</a>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-serif text-xl text-charcoal">{{ stylist.name }}</h3>
            <p class="font-sans text-sm text-gold font-medium mb-2">{{ stylist.role }}</p>
            <p class="font-sans text-xs text-charcoal/50 mb-3">{{ stylist.experience }} years experience</p>
            <div class="flex flex-wrap justify-center gap-1 mb-4">
              @for (tag of stylist.specialty; track tag) {
                <span class="badge-lavender text-xs">{{ tag }}</span>
              }
            </div>
            <p class="font-sans text-sm text-charcoal/65 leading-relaxed">{{ stylist.bio }}</p>
          </div>
        </div>
      }
    </div>
  </div>
</section>
  `,
})
export class AboutComponent {
  private ds = inject(SalonDataService);
  stylists = this.ds.getStylists();

  stats = [
    { value: '15+', label: 'Years' },
    { value: '30K+', label: 'Clients' },
    { value: '6', label: 'Awards' },
    { value: '2', label: 'Locations' },
  ];

  awards = [
    { icon: 'workspace_premium', title: 'Best Luxury Salon', body: 'Harper\'s Bazaar Beauty Awards', year: '2024' },
    { icon: 'star', title: 'Top Colourist', body: 'L\'Oréal Professionnel', year: '2023' },
    { icon: 'spa', title: 'Best Spa Experience', body: 'Tatler Spa Guide', year: '2023' },
    { icon: 'favorite', title: 'Client Choice Award', body: 'Treatwell', year: '2022–24' },
  ];

  milestones = [
    { year: '2009', title: 'Aura Opens in Chelsea', desc: 'Sophia Laurent opens the first Aura salon as a 4-chair boutique focused on precision cuts and colour.' },
    { year: '2013', title: 'Spa Wing Added', desc: 'Expanding to include a full spa suite with massage, facials, and body treatments.' },
    { year: '2016', title: 'Award-Winning Recognition', desc: 'First Harper\'s Bazaar nomination for Best Luxury Salon in London.' },
    { year: '2019', title: 'Mayfair Flagship Opens', desc: 'Our landmark flagship salon opens in Berkeley Square with 20 styling chairs.' },
    { year: '2022', title: 'Membership Programme Launches', desc: 'The Aura Inner Circle membership launches with 500 founding members in 48 hours.' },
    { year: '2024', title: 'Best Luxury Salon — Harper\'s Bazaar', desc: 'Recognised as the best luxury salon in the UK by Harper\'s Bazaar readers.' },
  ];
}
