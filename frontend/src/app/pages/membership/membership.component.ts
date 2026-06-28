import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SalonDataService } from '../../core/services/salon-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  template: `
<!-- Hero -->
<section class="relative h-72 md:h-96 flex items-end pb-12 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
    alt="Membership" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <p class="font-accent text-gold text-xl mb-2">VIP Access</p>
    <h1 class="font-serif text-5xl md:text-6xl text-white">Membership Plans</h1>
  </div>
</section>

<!-- Billing toggle -->
<section class="py-16 bg-gradient-luxury">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header
      tag="Join the Inner Circle"
      title="Elevate Your Beauty Routine"
      subtitle="Unlock exclusive benefits, priority access, and significant savings with an Aura membership tailored to your lifestyle."
    />

    <!-- Annual / Monthly toggle -->
    <div class="flex items-center justify-center gap-4 mb-12">
      <span class="font-sans text-sm" [class.text-charcoal]="!annual()" [class.text-charcoal-50]="annual()">Monthly</span>
      <button (click)="annual.set(!annual())"
        class="relative w-14 h-7 rounded-full transition-colors duration-300"
        [class.bg-gradient-gold]="annual()" [class.bg-cream-300]="!annual()">
        <span class="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
          [class.translate-x-1]="!annual()" [class.translate-x-8]="annual()"></span>
      </button>
      <span class="font-sans text-sm flex items-center gap-2"
        [class.text-charcoal]="annual()" [class.text-charcoal-50]="!annual()">
        Annual
        <span class="badge-gold text-xs">Save 20%</span>
      </span>
    </div>

    <!-- Plans grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      @for (plan of plans; track plan.id) {
        <div class="relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
          [class.shadow-hover]="plan.highlight"
          [class.shadow-card]="!plan.highlight"
          [class.scale-105]="plan.highlight">
          @if (plan.highlight) {
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-gold"></div>
            <div class="absolute top-4 right-4">
              <span class="badge-gold text-xs px-3 py-1.5">Most Popular</span>
            </div>
          }
          <div class="p-8 h-full flex flex-col"
            [class.bg-charcoal]="plan.highlight"
            [class.bg-white]="!plan.highlight">
            <!-- Icon & name -->
            <div class="mb-6">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl font-serif"
                [class.bg-gradient-gold]="plan.highlight"
                [class.bg-cream-200]="!plan.highlight"
                [class.text-white]="plan.highlight"
                [class.text-gold]="!plan.highlight">
                {{ plan.icon }}
              </div>
              <h3 class="font-serif text-2xl mb-1"
                [class.text-white]="plan.highlight"
                [class.text-charcoal]="!plan.highlight">
                {{ plan.name }}
              </h3>
              <p class="font-sans text-sm"
                [class.text-cream-60]="plan.highlight"
                [class.text-charcoal-50]="!plan.highlight">
                {{ plan.discount }}% off all services
              </p>
            </div>
            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-end gap-1">
                <span class="font-serif text-5xl font-semibold"
                  [class.text-gold]="true">
                  £{{ annual() ? Math.round(plan.price * 0.8) : plan.price }}
                </span>
                <span class="font-sans text-sm pb-2"
                  [class.text-cream-60]="plan.highlight"
                  [class.text-charcoal-50]="!plan.highlight">/month</span>
              </div>
              @if (annual()) {
                <p class="font-sans text-xs mt-1"
                  [class.text-cream-50]="plan.highlight"
                  [class.text-charcoal-40]="!plan.highlight">
                  Billed £{{ Math.round(plan.price * 0.8 * 12) }}/year
                </p>
              }
            </div>
            <!-- Benefits -->
            <ul class="space-y-3 flex-1 mb-8">
              @for (benefit of plan.benefits; track benefit) {
                <li class="flex items-start gap-3">
                  <span class="material-icons-round text-gold text-base mt-0.5">check_circle</span>
                  <span class="font-sans text-sm leading-relaxed"
                    [class.text-cream-80]="plan.highlight"
                    [class.text-charcoal-70]="!plan.highlight">
                    {{ benefit }}
                  </span>
                </li>
              }
            </ul>
            <!-- CTA -->
            <a routerLink="/booking"
              class="w-full text-center py-3.5 rounded-full font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              [class.bg-gradient-gold]="plan.highlight"
              [class.text-white]="plan.highlight"
              [class.shadow-gold]="plan.highlight"
              
              [class.border-2]="!plan.highlight"
              [class.border-gold]="!plan.highlight"
              [class.text-gold]="!plan.highlight"
              
              >
              Get {{ plan.name }} Plan
            </a>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- Comparison table -->
<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header tag="Compare" title="Plan Features at a Glance" />
    <div class="overflow-x-auto rounded-2xl shadow-card">
      <table class="w-full text-sm font-sans border-collapse">
        <thead>
          <tr class="bg-charcoal text-white">
            <th class="px-6 py-4 text-left font-semibold">Feature</th>
            @for (plan of plans; track plan.id) {
              <th class="px-6 py-4 text-center font-semibold">{{ plan.name }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of comparisonRows; track row.feature; let even = $even) {
            <tr [class.bg-cream-100]="even">
              <td class="px-6 py-4 text-charcoal/80 font-medium">{{ row.feature }}</td>
              @for (val of row.values; track $index) {
                <td class="px-6 py-4 text-center">
                  @if (val === true) {
                    <span class="material-icons-round text-gold text-lg">check_circle</span>
                  } @else if (val === false) {
                    <span class="material-icons-round text-charcoal/20 text-lg">remove</span>
                  } @else {
                    <span class="text-charcoal font-medium">{{ val }}</span>
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="py-16 bg-cream-100">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header tag="Questions?" title="Membership FAQ" />
    <div class="space-y-3">
      @for (faq of faqs; track faq.q; let i = $index) {
        <div class="bg-white rounded-2xl overflow-hidden border border-cream-300 transition-all duration-300"
          [class.border-gold-30]="activeFaq() === i">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left"
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
  `,
})
export class MembershipComponent {
  private ds = inject(SalonDataService);
  plans = this.ds.getMembershipPlans();
  annual = signal(false);
  activeFaq = signal(-1);
  Math = Math;

  comparisonRows = [
    { feature: 'Service Discount', values: ['10%', '20%', '30%'] },
    { feature: 'Monthly Free Treatment', values: ['Blowout', 'Hair Treatment', 'Unlimited Blowouts'] },
    { feature: 'Priority Booking', values: [true, true, true] },
    { feature: 'Birthday Gift Voucher', values: [true, true, true] },
    { feature: 'Dedicated Stylist', values: [false, true, true] },
    { feature: 'VIP Events', values: [false, true, true] },
    { feature: 'Complimentary Spa Session', values: [false, false, true] },
    { feature: 'Home Visit Available', values: [false, false, true] },
  ];

  faqs = [
    { q: 'Can I cancel my membership anytime?', a: 'Monthly memberships can be cancelled with 30 days\' notice. Annual memberships can be paused but are non-refundable.' },
    { q: 'Can I share my membership benefits?', a: 'Memberships are personal and non-transferable, but you can gift treatments using your monthly allowance.' },
    { q: 'How do I redeem my monthly free treatment?', a: 'Simply book online or in-salon and mention your membership tier. The free treatment is automatically applied.' },
    { q: 'Do unused benefits roll over?', a: 'Monthly free treatments do not roll over. Discounts and priority booking are always available throughout the month.' },
  ];
}
