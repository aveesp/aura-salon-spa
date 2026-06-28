import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { Service, Stylist, Testimonial, BlogPost, Offer } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SectionHeaderComponent],
  template: `
<!-- ─── HERO ─────────────────────────────────────────────────────────── -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background image -->
  <div class="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
      alt="Luxury salon interior"
      class="w-full h-full object-cover object-center"
      loading="eager"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70"></div>
  </div>

  <!-- Floating accents -->
  <div class="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl animate-float"></div>
  <div class="absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-blush/10 blur-3xl animate-float" style="animation-delay:2s"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-5xl mx-auto px-4 text-center">
    <p class="font-accent text-gold text-2xl md:text-3xl mb-4 animate-fade-in">Welcome to Aura</p>
    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 animate-fade-up">
      Crafting Beauty,<br><em class="text-gradient-gold not-italic">One Story at a Time</em>
    </h1>
    <p class="font-sans text-cream-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
      Award-winning luxury hair, skin & spa treatments in the heart of the city. Where elegance meets expertise.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-300">
      <a routerLink="/booking" class="btn-primary text-sm">
        <span class="material-icons-round text-base">calendar_month</span>
        Book Your Appointment
      </a>
      <a routerLink="/services" class="btn-white text-sm">
        <span class="material-icons-round text-base">auto_awesome</span>
        Explore Services
      </a>
    </div>

    <!-- Stats strip -->
    <div class="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up animate-delay-400">
      @for (stat of stats; track stat.label) {
        <div class="text-center">
          <p class="font-serif text-3xl md:text-4xl text-gold font-semibold">{{ stat.value }}</p>
          <p class="font-sans text-xs text-cream-100/60 mt-1 uppercase tracking-widest">{{ stat.label }}</p>
        </div>
      }
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
    <span class="font-sans text-xs text-white/50 tracking-widest uppercase">Scroll</span>
    <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
  </div>
</section>

<!-- ─── SEARCH BAR ─────────────────────────────────────────────────────── -->
<section class="relative z-20 -mt-8 mb-0">
  <div class="max-w-3xl mx-auto px-4">
    <div class="bg-white rounded-2xl shadow-hover p-2 flex flex-col sm:flex-row gap-2">
      <div class="flex items-center gap-3 flex-1 px-4 py-2 bg-cream-100 rounded-xl">
        <span class="material-icons-round text-gold">location_on</span>
        <input [(ngModel)]="searchQuery" placeholder="Search by location or salon name…"
          class="flex-1 bg-transparent font-sans text-sm text-charcoal placeholder:text-charcoal/40 outline-none" />
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-cream-100 rounded-xl sm:w-48">
        <span class="material-icons-round text-gold">cut</span>
        <select class="flex-1 bg-transparent font-sans text-sm text-charcoal outline-none">
          <option>All Services</option>
          <option>Hair</option>
          <option>Skin</option>
          <option>Spa</option>
          <option>Nails</option>
        </select>
      </div>
      <button class="btn-primary text-xs py-3 px-6 rounded-xl">
        <span class="material-icons-round text-sm">search</span>
        Find Salon
      </button>
    </div>
  </div>
</section>

<!-- ─── WHY CHOOSE US ─────────────────────────────────────────────────── -->
<section class="py-20 bg-gradient-luxury">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="The Aura Difference"
      title="A Signature Experience Like No Other"
      subtitle="Every visit is a sensory journey crafted with intention, expertise, and the finest products from around the world."
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (feat of features; track feat.title) {
        <div class="card-glass p-8 text-center group hover:border-gold/30 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-5 shadow-gold group-hover:scale-110 transition-transform duration-300">
            <span class="material-icons-round text-white text-2xl">{{ feat.icon }}</span>
          </div>
          <h3 class="font-serif text-xl text-charcoal mb-3">{{ feat.title }}</h3>
          <p class="font-sans text-sm text-charcoal/60 leading-relaxed">{{ feat.desc }}</p>
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── POPULAR SERVICES ─────────────────────────────────────────────── -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
      <app-section-header
        tag="What We Offer"
        title="Popular Beauty Services"
        class="text-left items-start"
      />
      <a routerLink="/services" class="btn-outline text-xs self-start md:self-auto shrink-0">
        View All Services
        <span class="material-icons-round text-sm">arrow_forward</span>
      </a>
    </div>
    <!-- Category tabs -->
    <div class="flex gap-2 flex-wrap mb-8">
      @for (cat of serviceCategories; track cat.key) {
        <button (click)="activeCategory.set(cat.key)"
          class="px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 border"
          [class.bg-gradient-gold]="activeCategory() === cat.key"
          [class.text-white]="activeCategory() === cat.key"
          [class.border-transparent]="activeCategory() === cat.key"
          [class.shadow-gold]="activeCategory() === cat.key"
          [class.border-cream-300]="activeCategory() !== cat.key"
          [class.text-charcoal]="activeCategory() !== cat.key"
          >
          {{ cat.label }}
        </button>
      }
    </div>
    <!-- Services grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      @for (svc of filteredServices(); track svc.id) {
        <div class="card-luxury group">
          <div class="relative overflow-hidden h-52">
            <img [src]="svc.image" [alt]="svc.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            @if (svc.popular) {
              <span class="absolute top-3 left-3 badge-gold">Popular</span>
            }
            <div class="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <a routerLink="/booking" class="btn-primary text-xs py-2 px-5">Book Now</a>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-serif text-lg text-charcoal mb-1">{{ svc.name }}</h3>
            <p class="font-sans text-xs text-charcoal/50 line-clamp-2 mb-3">{{ svc.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1 text-charcoal/50">
                <span class="material-icons-round text-sm">schedule</span>
                <span class="font-sans text-xs">{{ svc.duration }} min</span>
              </div>
              <span class="price-tag text-lg">From £{{ svc.startingPrice }}</span>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── OFFERS ─────────────────────────────────────────────────────────── -->
<section class="py-24 bg-charcoal relative overflow-hidden">
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blush blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="Limited Time"
      title="Exclusive Offers & Discounts"
      subtitle="Treat yourself to something extraordinary. Our seasonal promotions are crafted to give you the luxury experience you deserve."
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      @for (offer of offers; track offer.id) {
        <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
          <img [src]="offer.image" [alt]="offer.title"
            class="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div class="absolute top-4 right-4">
            <span class="badge-gold text-xs font-bold px-4 py-2 bg-gold text-white rounded-full">{{ offer.discount }}</span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="font-serif text-xl text-white mb-2">{{ offer.title }}</h3>
            <p class="font-sans text-sm text-white/70 mb-4 line-clamp-2">{{ offer.description }}</p>
            @if (offer.code) {
              <div class="flex items-center gap-2 mb-4">
                <span class="font-sans text-xs text-white/60">Code:</span>
                <code class="px-3 py-1 bg-white/10 backdrop-blur rounded-lg text-gold text-xs font-mono tracking-widest">{{ offer.code }}</code>
              </div>
            }
            <a routerLink="/booking" class="btn-primary text-xs py-2 px-5">Claim Offer</a>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── STYLISTS ─────────────────────────────────────────────────────── -->
<section class="py-24 bg-cream-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
      <app-section-header
        tag="Meet the Experts"
        title="Our Award-Winning Stylists"
        class="text-left items-start"
      />
      <a routerLink="/about" class="btn-outline text-xs self-start md:self-auto shrink-0">
        Full Team <span class="material-icons-round text-sm">arrow_forward</span>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (stylist of stylists.slice(0,3); track stylist.id) {
        <div class="card-luxury group text-center">
          <div class="relative overflow-hidden h-72">
            <img [src]="stylist.image" [alt]="stylist.name"
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            @if (stylist.instagram) {
              <div class="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span class="px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-white font-sans text-xs">{{ stylist.instagram }}</span>
              </div>
            }
          </div>
          <div class="p-6">
            <div class="flex items-center justify-center gap-1 mb-1">
              @for (i of [1,2,3,4,5]; track i) {
                <span class="text-gold text-sm">★</span>
              }
              <span class="font-sans text-xs text-charcoal/50 ml-1">({{ stylist.reviewCount }})</span>
            </div>
            <h3 class="font-serif text-xl text-charcoal">{{ stylist.name }}</h3>
            <p class="font-sans text-sm text-gold font-medium mb-3">{{ stylist.role }}</p>
            <div class="flex flex-wrap justify-center gap-1 mb-4">
              @for (tag of stylist.specialty; track tag) {
                <span class="badge-lavender text-xs">{{ tag }}</span>
              }
            </div>
            <p class="font-sans text-sm text-charcoal/60 line-clamp-2 mb-5">{{ stylist.bio }}</p>
            <a routerLink="/booking" class="btn-outline text-xs py-2.5">Book with {{ stylist.name.split(' ')[0] }}</a>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── BEFORE & AFTER ─────────────────────────────────────────────── -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="Transformations"
      title="Before & After Gallery"
      subtitle="Witness the artistry of our stylists through real client transformations that speak for themselves."
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      @for (item of beforeAfterItems; track item.id) {
        <div class="rounded-2xl overflow-hidden shadow-card group">
          <div class="relative flex h-72">
            <div class="flex-1 relative overflow-hidden">
              <img [src]="item.before" alt="Before" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div class="absolute top-3 left-3">
                <span class="px-3 py-1 bg-charcoal/80 text-white text-xs font-sans tracking-wider rounded-full">Before</span>
              </div>
            </div>
            <div class="w-0.5 bg-white z-10 relative">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-luxury flex items-center justify-center z-20">
                <span class="material-icons-round text-gold text-sm">compare_arrows</span>
              </div>
            </div>
            <div class="flex-1 relative overflow-hidden">
              <img [src]="item.after" alt="After" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-gold text-white text-xs font-sans tracking-wider rounded-full">After</span>
              </div>
            </div>
          </div>
          <div class="bg-cream-100 px-6 py-4">
            <h4 class="font-serif text-lg text-charcoal">{{ item.title }}</h4>
            <p class="font-sans text-sm text-charcoal/50">By {{ item.artist }}</p>
          </div>
        </div>
      }
    </div>
    <div class="text-center mt-10">
      <a routerLink="/gallery" class="btn-outline text-sm">
        See Full Gallery <span class="material-icons-round text-sm">arrow_forward</span>
      </a>
    </div>
  </div>
</section>

<!-- ─── TESTIMONIALS ─────────────────────────────────────────────────── -->
<section class="py-24 bg-gradient-luxury">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="Client Love"
      title="What Our Clients Say"
      subtitle="Over 10,000 happy clients trust Aura for their beauty needs. Here are some of their stories."
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @for (t of testimonials; track t.id) {
        <div class="card-glass p-7 flex flex-col gap-4 hover:border-gold/20 transition-all duration-300">
          <!-- Stars -->
          <div class="flex gap-0.5">
            @for (i of [1,2,3,4,5]; track i) {
              <span class="text-gold">★</span>
            }
          </div>
          <!-- Quote -->
          <blockquote class="font-sans text-charcoal/75 text-sm leading-relaxed flex-1">
            "{{ t.review }}"
          </blockquote>
          <!-- Footer -->
          <div class="flex items-center gap-3 pt-2 border-t border-gold/10">
            <img [src]="t.avatar" [alt]="t.name" class="w-10 h-10 rounded-full object-cover" loading="lazy" />
            <div>
              <p class="font-sans text-sm font-semibold text-charcoal">{{ t.name }}</p>
              <p class="font-sans text-xs text-charcoal/50">{{ t.service }}</p>
            </div>
            @if (t.verified) {
              <div class="ml-auto">
                <span class="material-icons-round text-gold text-sm" title="Verified client">verified</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
    <!-- Trust indicators -->
    <div class="mt-12 flex flex-wrap justify-center gap-8 items-center">
      @for (trust of trustIndicators; track trust.label) {
        <div class="flex items-center gap-2 text-charcoal/60">
          <span class="material-icons-round text-gold text-xl">{{ trust.icon }}</span>
          <span class="font-sans text-sm font-medium">{{ trust.label }}</span>
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── INSTAGRAM GALLERY ─────────────────────────────────────────────── -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="&#64;aurasalon"
      title="Follow Our Journey"
      subtitle="Get inspired on Instagram. Tag us for a chance to be featured."
    />
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      @for (img of instaImages; track img.src; let i = $index) {
        <div class="relative group overflow-hidden rounded-xl aspect-square"
          [class.col-span-2]="i === 0 || i === 3"
          [class.row-span-2]="i === 0 || i === 3">
          <img [src]="img.src" [alt]="img.alt"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="material-icons-round text-white text-3xl">favorite</span>
          </div>
        </div>
      }
    </div>
    <div class="text-center mt-8">
      <a href="#" class="btn-ghost text-sm" target="_blank" rel="noopener">
        <span class="material-icons-round text-sm">photo_camera</span>
        Follow &#64;aurasalon
      </a>
    </div>
  </div>
</section>

<!-- ─── BLOG ─────────────────────────────────────────────────────────── -->
<section class="py-24 bg-cream-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
      <app-section-header
        tag="Beauty Tips & Insights"
        title="From Our Blog"
        class="text-left items-start"
      />
      <a href="#" class="btn-outline text-xs self-start md:self-auto shrink-0">
        All Articles <span class="material-icons-round text-sm">arrow_forward</span>
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      @for (post of blogPosts; track post.id) {
        <article class="card-luxury group">
          <div class="relative overflow-hidden h-52">
            <img [src]="post.image" [alt]="post.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <span class="absolute top-3 left-3 badge-blush">{{ post.category }}</span>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="font-sans text-xs text-charcoal/40">{{ post.author }}</span>
              <span class="w-1 h-1 rounded-full bg-charcoal/20"></span>
              <span class="font-sans text-xs text-charcoal/40">{{ post.readTime }} min read</span>
            </div>
            <h3 class="font-serif text-xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-200">{{ post.title }}</h3>
            <p class="font-sans text-sm text-charcoal/60 line-clamp-3 mb-5">{{ post.excerpt }}</p>
            <a href="#" class="font-sans text-sm font-semibold text-gold flex items-center gap-1 hover:gap-2 transition-all duration-200">
              Read More <span class="material-icons-round text-sm">arrow_forward</span>
            </a>
          </div>
        </article>
      }
    </div>
  </div>
</section>

<!-- ─── FAQ ─────────────────────────────────────────────────────────── -->
<section class="py-24 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="Got Questions?"
      title="Frequently Asked Questions"
    />
    <div class="space-y-3">
      @for (faq of faqs; track faq.q; let i = $index) {
        <div class="border border-cream-300 rounded-2xl overflow-hidden transition-all duration-300"
          [class.border-gold-30]="activeFaq() === i">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
            [class.bg-gold-soft]="activeFaq() === i"
            (click)="activeFaq.set(activeFaq() === i ? -1 : i)">
            <span class="font-sans font-semibold text-charcoal">{{ faq.q }}</span>
            <span class="material-icons-round text-gold transition-transform duration-300 shrink-0 ml-4"
              [class.rotate-45]="activeFaq() === i">add</span>
          </button>
          @if (activeFaq() === i) {
            <div class="px-6 pb-5 animate-fade-in">
              <p class="font-sans text-sm text-charcoal/65 leading-relaxed">{{ faq.a }}</p>
            </div>
          }
        </div>
      }
    </div>
  </div>
</section>

<!-- ─── NEWSLETTER ─────────────────────────────────────────────────── -->
<section class="py-20 bg-gradient-gold">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <p class="font-accent text-white/80 text-2xl mb-3">Stay Beautiful</p>
    <h2 class="font-serif text-4xl md:text-5xl text-white mb-4">Get Exclusive Offers</h2>
    <p class="font-sans text-white/75 text-lg mb-10 max-w-xl mx-auto">Join our inner circle for early access to seasonal promotions, beauty tips, and VIP event invitations.</p>
    <form class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" (submit)="subscribeNewsletter($event)">
      <input type="email" placeholder="Enter your email address" required
        class="flex-1 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 font-sans focus:outline-none focus:bg-white/30 transition-colors duration-200" />
      <button type="submit" class="px-8 py-4 bg-white text-gold font-sans font-semibold text-sm tracking-widest uppercase rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
        Subscribe
      </button>
    </form>
    <p class="font-sans text-xs text-white/50 mt-4">No spam. Unsubscribe anytime.</p>
  </div>
</section>

<!-- ─── CONTACT CTA ─────────────────────────────────────────────────── -->
<section class="py-20 bg-charcoal">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="section-tag mb-3">Get In Touch</p>
        <h2 class="section-title text-white mb-5">Ready to Begin Your<br>Transformation?</h2>
        <p class="font-sans text-cream-300/70 text-lg mb-8 leading-relaxed">
          Whether you're planning a special occasion, need expert hair advice, or simply want to treat yourself — our team is here to help you look and feel your absolute best.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a routerLink="/booking" class="btn-primary text-sm">
            <span class="material-icons-round text-base">calendar_month</span>
            Book Now
          </a>
          <a routerLink="/contact" class="btn-outline text-sm border-white/30 text-white hover:bg-white hover:text-charcoal">
            <span class="material-icons-round text-base">chat_bubble_outline</span>
            Contact Us
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        @for (info of contactInfo; track info.label) {
          <div class="card-glass bg-white/5 border-white/10 p-6 rounded-2xl">
            <div class="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
              <span class="material-icons-round text-white">{{ info.icon }}</span>
            </div>
            <p class="font-sans text-xs text-cream-300/60 uppercase tracking-wider mb-1">{{ info.label }}</p>
            <p class="font-sans text-sm text-white font-medium">{{ info.value }}</p>
          </div>
        }
      </div>
    </div>
  </div>
</section>
  `,
})
export class HomeComponent implements OnInit {
  private ds = inject(SalonDataService);

  services = this.ds.getServices();
  stylists = this.ds.getStylists();
  testimonials = this.ds.getTestimonials();
  blogPosts = this.ds.getBlogPosts();
  offers = this.ds.getOffers();

  searchQuery = '';
  activeCategory = signal('all');
  activeFaq = signal(-1);

  stats = [
    { value: '15+', label: 'Years' },
    { value: '30K+', label: 'Clients' },
    { value: '5★', label: 'Rating' },
  ];

  features = [
    { icon: 'workspace_premium', title: 'Award-Winning', desc: 'Recognised internationally for excellence in hair, beauty, and spa services.' },
    { icon: 'spa', title: 'Luxury Products', desc: 'Exclusively using L\'Oréal Professionnel, Kérastase, and La Mer for every treatment.' },
    { icon: 'group', title: 'Expert Team', desc: 'Our stylists train with the world\'s best and attend masterclasses twice a year.' },
    { icon: 'favorite', title: 'Client-First', desc: 'Every appointment is fully personalised. Your comfort and satisfaction is our priority.' },
  ];

  serviceCategories = [
    { key: 'all', label: 'All' },
    { key: 'hair', label: 'Hair' },
    { key: 'skin', label: 'Skin & Face' },
    { key: 'massage', label: 'Massage' },
    { key: 'spa', label: 'Spa' },
    { key: 'nails', label: 'Nails' },
    { key: 'makeup', label: 'Makeup' },
    { key: 'men', label: 'Men' },
  ];

  filteredServices = () => {
    const cat = this.activeCategory();
    const all = this.services;
    return cat === 'all' ? all.slice(0, 8) : all.filter(s => s.category === cat).slice(0, 8);
  };

  beforeAfterItems = [
    { id: 1, before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', after: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', title: 'Brunette to Platinum Balayage', artist: 'Sophia Laurent' },
    { id: 2, before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400', after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400', title: 'Deep Cleanse Glow Facial', artist: 'Isabella Rose' },
  ];

  instaImages = [
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', alt: 'Hair styling' },
    { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', alt: 'Colour treatment' },
    { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', alt: 'Spa treatment' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', alt: 'Bridal makeup' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', alt: 'Nail art' },
    { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', alt: 'Men grooming' },
    { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400', alt: 'Facial treatment' },
    { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', alt: 'Massage' },
  ];

  faqs = [
    { q: 'How do I book an appointment?', a: 'You can book directly through our website using the Book Now button, call us, or walk into any of our salons. Online booking is available 24/7.' },
    { q: 'What is your cancellation policy?', a: 'We ask for at least 24 hours\' notice for cancellations or reschedules. Late cancellations may incur a 50% charge to cover stylist time.' },
    { q: 'Do you offer consultations?', a: 'Yes! We offer complimentary consultations for colour and bridal services. Simply book a consultation slot online — no obligation to proceed.' },
    { q: 'What products do you use?', a: 'We exclusively use premium professional brands including L\'Oréal Professionnel, Kérastase, La Mer, and Dermalogica across all our treatments.' },
    { q: 'Do you offer gift vouchers?', a: 'Absolutely. Our gift vouchers are available online and in-salon in any denomination. They make the perfect gift for any occasion.' },
    { q: 'Is parking available?', a: 'Our Mayfair location has valet parking available. The Chelsea salon has a nearby NCP car park with a 15% discount for our clients.' },
  ];

  trustIndicators = [
    { icon: 'verified', label: '10,000+ Verified Reviews' },
    { icon: 'workspace_premium', label: 'Award-Winning Salon' },
    { icon: 'lock', label: 'Secure Online Booking' },
    { icon: 'favorite', label: '98% Client Satisfaction' },
  ];

  contactInfo = [
    { icon: 'phone', label: 'Call Us', value: '+44 20 7946 0100' },
    { icon: 'mail', label: 'Email', value: 'hello@aurasalon.com' },
    { icon: 'location_on', label: 'Location', value: '45 Berkeley Square, London' },
    { icon: 'schedule', label: 'Hours', value: 'Mon–Sat: 9am – 8pm' },
  ];

  ngOnInit() {
    // Could trigger intersection observer for scroll animations
  }

  subscribeNewsletter(e: Event) { e.preventDefault(); }
}
