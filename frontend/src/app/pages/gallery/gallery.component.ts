import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

type GalleryTab = 'all' | 'before-after' | 'transformation' | 'bridal' | 'video';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  template: `
<!-- Hero -->
<section class="relative h-72 md:h-96 flex items-end pb-12 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80"
    alt="Gallery" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <p class="font-accent text-gold text-xl mb-2">Transformations</p>
    <h1 class="font-serif text-5xl md:text-6xl text-white">Our Gallery</h1>
  </div>
</section>

<!-- Tabs -->
<div class="sticky top-20 z-30 bg-white/95 backdrop-blur-md shadow-luxury py-4">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex gap-2 flex-wrap">
      @for (tab of tabs; track tab.key) {
        <button (click)="activeTab.set(tab.key)"
          class="px-5 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 border"
          [class.bg-gradient-gold]="activeTab() === tab.key"
          [class.text-white]="activeTab() === tab.key"
          [class.border-transparent]="activeTab() === tab.key"
          [class.shadow-gold]="activeTab() === tab.key"
          [class.border-cream-300]="activeTab() !== tab.key"
          [class.text-charcoal]="activeTab() !== tab.key">
          {{ tab.label }}
        </button>
      }
    </div>
  </div>
</div>

<section class="py-16 bg-cream-100 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Before & After -->
    @if (activeTab() === 'all' || activeTab() === 'before-after') {
      <div class="mb-16">
        <app-section-header tag="Side by Side" title="Before & After" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (item of beforeAfterItems; track item.id) {
            <div class="card-luxury group overflow-hidden">
              <div class="relative flex h-80">
                <div class="flex-1 relative overflow-hidden">
                  <img [src]="item.before" alt="Before" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span class="absolute top-3 left-3 px-3 py-1 bg-black/60 text-white text-xs rounded-full font-sans tracking-wider">Before</span>
                </div>
                <div class="w-0.5 bg-white relative z-10">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-luxury flex items-center justify-center">
                    <span class="material-icons-round text-gold text-base">compare_arrows</span>
                  </div>
                </div>
                <div class="flex-1 relative overflow-hidden">
                  <img [src]="item.after" alt="After" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span class="absolute top-3 right-3 px-3 py-1 bg-gold text-white text-xs rounded-full font-sans tracking-wider">After</span>
                </div>
              </div>
              <div class="px-6 py-4 bg-white">
                <h3 class="font-serif text-lg text-charcoal">{{ item.title }}</h3>
                <p class="font-sans text-sm text-charcoal/50">By {{ item.artist }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Transformations masonry -->
    @if (activeTab() === 'all' || activeTab() === 'transformation') {
      <div class="mb-16">
        <app-section-header tag="Hair Transformations" title="Style Gallery" />
        <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          @for (img of transformationImages; track img.src) {
            <div class="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer shadow-card hover:shadow-hover transition-shadow duration-300">
              <div class="relative">
                <img [src]="img.src" [alt]="img.alt"
                  class="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"
                  [style.aspect-ratio]="img.ratio" />
                <div class="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <p class="text-white font-serif text-sm">{{ img.alt }}</p>
                    <p class="text-white/60 font-sans text-xs">{{ img.artist }}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Bridal gallery -->
    @if (activeTab() === 'all' || activeTab() === 'bridal') {
      <div class="mb-16">
        <app-section-header tag="Special Days" title="Bridal Gallery" subtitle="Every bride deserves to feel like the most radiant version of herself." />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (img of bridalImages; track img.src) {
            <div class="group rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-300 cursor-pointer">
              <div class="relative h-80 overflow-hidden">
                <img [src]="img.src" [alt]="img.alt"
                  class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p class="text-white font-serif text-lg">{{ img.alt }}</p>
                  <a routerLink="/booking" class="mt-2 inline-block btn-primary text-xs py-2 px-4">Book Bridal Consultation</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Video gallery -->
    @if (activeTab() === 'all' || activeTab() === 'video') {
      <div>
        <app-section-header tag="Watch & Be Inspired" title="Video Gallery" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (vid of videos; track vid.id) {
            <div class="card-luxury group cursor-pointer" (click)="openVideo(vid.url)">
              <div class="relative h-56 overflow-hidden">
                <img [src]="vid.thumb" [alt]="vid.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons-round text-white text-4xl ml-1">play_arrow</span>
                  </div>
                </div>
                <span class="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded font-sans">{{ vid.duration }}</span>
              </div>
              <div class="p-5">
                <h3 class="font-serif text-lg text-charcoal">{{ vid.title }}</h3>
                <p class="font-sans text-sm text-charcoal/50">{{ vid.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    }

  </div>
</section>

<!-- Video modal -->
@if (activeVideo()) {
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" (click)="activeVideo.set('')">
    <div class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden" (click)="$event.stopPropagation()">
      <button (click)="activeVideo.set('')"
        class="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <span class="material-icons-round">close</span>
      </button>
      <div class="w-full h-full flex items-center justify-center text-white">
        <p class="font-sans text-lg">Video player would embed here</p>
      </div>
    </div>
  </div>
}
  `,
})
export class GalleryComponent {
  activeTab = signal<GalleryTab>('all');
  activeVideo = signal('');

  tabs = [
    { key: 'all' as GalleryTab, label: 'All' },
    { key: 'before-after' as GalleryTab, label: 'Before & After' },
    { key: 'transformation' as GalleryTab, label: 'Transformations' },
    { key: 'bridal' as GalleryTab, label: 'Bridal' },
    { key: 'video' as GalleryTab, label: 'Videos' },
  ];

  beforeAfterItems = [
    { id: 1, before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', after: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', title: 'Brunette to Platinum Balayage', artist: 'Sophia Laurent' },
    { id: 2, before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400', after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400', title: 'Deep Cleanse Radiance Facial', artist: 'Isabella Rose' },
    { id: 3, before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', title: 'Beard Sculpt & Shave', artist: 'James Rivera' },
    { id: 4, before: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', after: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', title: 'Keratin Smoothing Treatment', artist: 'Sophia Laurent' },
  ];

  transformationImages = [
    { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', alt: 'Balayage Perfection', artist: 'Sophia Laurent', ratio: '3/4' },
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', alt: 'Precision Cut', artist: 'Marcus Chen', ratio: '4/5' },
    { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', alt: 'Glamour Waves', artist: 'Sophia Laurent', ratio: '1/1' },
    { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', alt: 'Silk Blowout', artist: 'Marcus Chen', ratio: '3/4' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', alt: 'Nail Artistry', artist: 'Emma Walsh', ratio: '4/5' },
    { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', alt: 'Men\'s Styling', artist: 'James Rivera', ratio: '1/1' },
    { src: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=400', alt: 'Vivid Colour', artist: 'Marcus Chen', ratio: '3/4' },
    { src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400', alt: 'Glow Treatment', artist: 'Isabella Rose', ratio: '4/5' },
  ];

  bridalImages = [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', alt: 'Ethereal Bridal Look' },
    { src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600', alt: 'Classic Glamour' },
    { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', alt: 'Garden Romance' },
    { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600', alt: 'Braided Updo' },
    { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600', alt: 'Dewy Skin' },
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600', alt: 'Natural Glow' },
  ];

  videos = [
    { id: 'v1', title: 'The Art of Balayage', description: 'Watch Sophia transform a client from brunette to sun-kissed perfection.', thumb: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600', duration: '3:24', url: '' },
    { id: 'v2', title: 'Luxury Spa Experience', description: 'Take a tour of our Mayfair spa sanctuary and discover our signature treatments.', thumb: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600', duration: '2:45', url: '' },
    { id: 'v3', title: 'Bridal Hair Tutorial', description: 'Step-by-step tutorial on creating the perfect bridal updo by Isabella.', thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', duration: '5:12', url: '' },
  ];

  openVideo(url: string) { this.activeVideo.set(url || 'open'); }
}
