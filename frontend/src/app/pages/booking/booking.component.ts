import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SalonDataService } from '../../core/services/salon-data.service';
import { Service, Stylist } from '../../core/models';

type Step = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
<!-- Hero -->
<section class="relative h-56 flex items-end pb-10 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
    alt="Book Appointment" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <h1 class="font-serif text-4xl md:text-5xl text-white">Book Your Appointment</h1>
    <p class="font-sans text-cream-100/70 text-sm mt-2">Online booking — quick, easy, and available 24/7</p>
  </div>
</section>

<div class="min-h-screen bg-gradient-luxury py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Progress bar -->
    <div class="mb-10">
      <div class="flex items-center justify-between relative">
        <div class="absolute left-0 right-0 top-5 h-0.5 bg-cream-300 -z-0"></div>
        <div class="absolute left-0 top-5 h-0.5 bg-gradient-gold -z-0 transition-all duration-500"
          [style.width]="progressWidth()"></div>
        @for (step of steps; track step.num) {
          <div class="flex flex-col items-center gap-2 relative z-10">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-sans font-semibold text-sm transition-all duration-300 border-2"
              [class.bg-gradient-gold]="currentStep() >= step.num"
              [class.text-white]="currentStep() >= step.num"
              [class.border-transparent]="currentStep() >= step.num"
              [class.shadow-gold]="currentStep() === step.num"
              [class.bg-white]="currentStep() < step.num"
              [class.text-charcoal-40]="currentStep() < step.num"
              [class.border-cream-300]="currentStep() < step.num">
              @if (currentStep() > step.num) {
                <span class="material-icons-round text-sm">check</span>
              } @else {
                {{ step.num }}
              }
            </div>
            <span class="font-sans text-xs hidden sm:block"
              [class.text-gold]="currentStep() >= step.num"
              [class.font-semibold]="currentStep() === step.num"
              [class.text-charcoal-40]="currentStep() < step.num">
              {{ step.label }}
            </span>
          </div>
        }
      </div>
    </div>

    <!-- Step 1: Service -->
    @if (currentStep() === 1) {
      <div class="animate-fade-up">
        <h2 class="font-serif text-2xl text-charcoal mb-6">Choose Your Service</h2>
        <!-- Search -->
        <div class="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-cream-300 mb-6">
          <span class="material-icons-round text-gold text-sm">search</span>
          <input [(ngModel)]="serviceSearch" placeholder="Search services…"
            class="flex-1 bg-transparent font-sans text-sm outline-none placeholder:text-charcoal/40" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (svc of filteredBookingServices(); track svc.id) {
            <button (click)="selectService(svc)"
              class="flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:border-gold hover:shadow-gold group"
              [class.border-gold]="selectedService()?.id === svc.id"
              [class.bg-gold-soft]="selectedService()?.id === svc.id"
              [class.shadow-gold]="selectedService()?.id === svc.id"
              [class.border-cream-300]="selectedService()?.id !== svc.id"
              [class.bg-white]="selectedService()?.id !== svc.id">
              <img [src]="svc.image" [alt]="svc.name"
                class="w-16 h-16 rounded-xl object-cover shrink-0" loading="lazy" />
              <div class="flex-1">
                <h3 class="font-sans font-semibold text-charcoal group-hover:text-gold transition-colors">{{ svc.name }}</h3>
                <p class="font-sans text-xs text-charcoal/50 mt-0.5 line-clamp-2">{{ svc.description }}</p>
                <div class="flex items-center gap-3 mt-2">
                  <span class="font-sans text-xs text-charcoal/40 flex items-center gap-1">
                    <span class="material-icons-round text-xs">schedule</span> {{ svc.duration }}min
                  </span>
                  <span class="price-tag text-base">₹{{ svc.startingPrice }}</span>
                </div>
              </div>
              @if (selectedService()?.id === svc.id) {
                <span class="material-icons-round text-gold shrink-0">check_circle</span>
              }
            </button>
          }
        </div>
        <div class="flex justify-end mt-8">
          <button (click)="nextStep()" [disabled]="!selectedService()"
            class="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            Next: Choose Stylist
            <span class="material-icons-round text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    }

    <!-- Step 2: Stylist -->
    @if (currentStep() === 2) {
      <div class="animate-fade-up">
        <h2 class="font-serif text-2xl text-charcoal mb-6">Choose Your Stylist</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <!-- No preference option -->
          <button (click)="selectedStylist.set(null)"
            class="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200"
            [class.border-gold]="selectedStylist() === null"
            [class.bg-gold-soft]="selectedStylist() === null"
            [class.border-cream-300]="selectedStylist() !== null"
            [class.bg-white]="selectedStylist() !== null">
            <div class="w-16 h-16 rounded-xl bg-cream-200 flex items-center justify-center shrink-0">
              <span class="material-icons-round text-gold text-2xl">people</span>
            </div>
            <div>
              <p class="font-sans font-semibold text-charcoal">No Preference</p>
              <p class="font-sans text-xs text-charcoal/50 mt-0.5">Assign the best available stylist</p>
            </div>
            @if (selectedStylist() === null) {
              <span class="material-icons-round text-gold ml-auto">check_circle</span>
            }
          </button>
          @for (stylist of stylists; track stylist.id) {
            <button (click)="selectedStylist.set(stylist)"
              class="flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:border-gold"
              [class.border-gold]="selectedStylist()?.id === stylist.id"
              [class.bg-gold-soft]="selectedStylist()?.id === stylist.id"
              [class.border-cream-300]="selectedStylist()?.id !== stylist.id"
              [class.bg-white]="selectedStylist()?.id !== stylist.id">
              <img [src]="stylist.image" [alt]="stylist.name"
                class="w-16 h-16 rounded-xl object-cover object-top shrink-0" loading="lazy" />
              <div class="flex-1">
                <p class="font-sans font-semibold text-charcoal">{{ stylist.name }}</p>
                <p class="font-sans text-xs text-gold">{{ stylist.role }}</p>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-gold text-xs">★</span>
                  <span class="font-sans text-xs text-charcoal/50">{{ stylist.rating }} ({{ stylist.reviewCount }})</span>
                </div>
              </div>
              @if (selectedStylist()?.id === stylist.id) {
                <span class="material-icons-round text-gold shrink-0">check_circle</span>
              }
            </button>
          }
        </div>
        <div class="flex justify-between mt-8">
          <button (click)="prevStep()" class="btn-ghost text-sm">
            <span class="material-icons-round text-sm">arrow_back</span> Back
          </button>
          <button (click)="nextStep()" class="btn-primary">
            Next: Date & Time <span class="material-icons-round text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    }

    <!-- Step 3: Date & Time -->
    @if (currentStep() === 3) {
      <div class="animate-fade-up">
        <h2 class="font-serif text-2xl text-charcoal mb-6">Select Date & Time</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Date picker (simple inline calendar) -->
          <div class="card-luxury p-6">
            <h3 class="font-sans font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span class="material-icons-round text-gold">calendar_month</span>
              Select Date
            </h3>
            <div class="flex items-center justify-between mb-4">
              <button (click)="prevMonth()" class="w-8 h-8 rounded-full hover:bg-cream-200 flex items-center justify-center transition-colors">
                <span class="material-icons-round text-charcoal text-sm">chevron_left</span>
              </button>
              <span class="font-sans font-semibold text-charcoal">{{ calendarMonth() }}</span>
              <button (click)="nextMonth()" class="w-8 h-8 rounded-full hover:bg-cream-200 flex items-center justify-center transition-colors">
                <span class="material-icons-round text-charcoal text-sm">chevron_right</span>
              </button>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center mb-2">
              @for (day of ['Su','Mo','Tu','We','Th','Fr','Sa']; track day) {
                <span class="font-sans text-xs text-charcoal/40 py-1">{{ day }}</span>
              }
            </div>
            <div class="grid grid-cols-7 gap-1">
              @for (cell of calendarCells(); track $index) {
                <button
                  [disabled]="!cell.date || cell.past"
                  (click)="cell.date && !cell.past && selectDate(cell.date)"
                  class="aspect-square rounded-full text-xs font-sans flex items-center justify-center transition-all duration-200"
                  [class.invisible]="!cell.date"
                  [class.bg-gradient-gold]="selectedDate() && cell.date && selectedDate()!.toDateString() === cell.date.toDateString()"
                  [class.text-white]="selectedDate() && cell.date && selectedDate()!.toDateString() === cell.date.toDateString()"
                  [class.shadow-gold]="selectedDate() && cell.date && selectedDate()!.toDateString() === cell.date.toDateString()"
                  [class.text-charcoal-30]="cell.past"
                  
                  [class.text-charcoal]="!cell.past && !(selectedDate() && cell.date && selectedDate()!.toDateString() === cell.date.toDateString())"
                  [class.cursor-not-allowed]="cell.past">
                  {{ cell.day }}
                </button>
              }
            </div>
          </div>
          <!-- Time slots -->
          <div class="card-luxury p-6">
            <h3 class="font-sans font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span class="material-icons-round text-gold">schedule</span>
              Select Time
            </h3>
            @if (!selectedDate()) {
              <div class="flex flex-col items-center justify-center h-40 text-charcoal/30">
                <span class="material-icons-round text-4xl mb-2">event</span>
                <p class="font-sans text-sm">Please select a date first</p>
              </div>
            } @else {
              <div class="grid grid-cols-3 gap-2">
                @for (slot of timeSlots; track slot.time) {
                  <button (click)="slot.available && selectTime(slot.time)" [disabled]="!slot.available"
                    class="py-2.5 px-2 rounded-xl text-xs font-sans font-medium transition-all duration-200"
                    [class.bg-gradient-gold]="selectedTime() === slot.time"
                    [class.text-white]="selectedTime() === slot.time"
                    [class.shadow-gold]="selectedTime() === slot.time"
                    [class.bg-cream-100]="selectedTime() !== slot.time"
                    [class.text-charcoal]="slot.available"
                    [class.opacity-40]="!slot.available"
                    [class.line-through]="!slot.available"
                    [class.cursor-not-allowed]="!slot.available">
                    {{ slot.time }}
                  </button>
                }
              </div>
            }
          </div>
        </div>
        <div class="flex justify-between mt-8">
          <button (click)="prevStep()" class="btn-ghost text-sm">
            <span class="material-icons-round text-sm">arrow_back</span> Back
          </button>
          <button (click)="nextStep()" [disabled]="!selectedDate() || !selectedTime()"
            class="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            Next: Your Details <span class="material-icons-round text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    }

    <!-- Step 4: Details & Confirm -->
    @if (currentStep() === 4) {
      <div class="animate-fade-up">
        @if (!bookingConfirmed()) {
          <h2 class="font-serif text-2xl text-charcoal mb-6">Your Details</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form [formGroup]="detailsForm" (ngSubmit)="confirmBooking()" class="lg:col-span-2 space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">First Name *</label>
                  <input formControlName="firstName" class="input-luxury" placeholder="Sophia" />
                </div>
                <div>
                  <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Last Name *</label>
                  <input formControlName="lastName" class="input-luxury" placeholder="Laurent" />
                </div>
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Email *</label>
                <input formControlName="email" type="email" class="input-luxury" placeholder="you@example.com" />
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Phone *</label>
                <input formControlName="phone" type="tel" class="input-luxury" placeholder="+44 7700 900000" />
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Special Requests</label>
                <textarea formControlName="notes" rows="3" class="input-luxury resize-none"
                  placeholder="Allergies, preferences, or anything else we should know…"></textarea>
              </div>
              <div class="flex justify-between mt-4">
                <button type="button" (click)="prevStep()" class="btn-ghost text-sm">
                  <span class="material-icons-round text-sm">arrow_back</span> Back
                </button>
                <button type="submit" [disabled]="detailsForm.invalid || confirming()"
                  class="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                  @if (confirming()) {
                    <span class="material-icons-round text-sm animate-spin">refresh</span> Confirming…
                  } @else {
                    <span class="material-icons-round text-sm">check</span> Confirm Booking
                  }
                </button>
              </div>
            </form>

            <!-- Order summary -->
            <div class="card-glass p-6 h-fit">
              <h3 class="font-sans font-semibold text-charcoal mb-5 text-sm uppercase tracking-wider">Booking Summary</h3>
              <div class="space-y-4 text-sm font-sans">
                <div class="flex gap-3 items-start">
                  <span class="material-icons-round text-gold text-base mt-0.5">spa</span>
                  <div>
                    <p class="text-charcoal/50 text-xs">Service</p>
                    <p class="text-charcoal font-medium">{{ selectedService()?.name }}</p>
                    <p class="text-charcoal/50 text-xs">{{ selectedService()?.duration }} min</p>
                  </div>
                </div>
                <div class="flex gap-3 items-start">
                  <span class="material-icons-round text-gold text-base mt-0.5">person</span>
                  <div>
                    <p class="text-charcoal/50 text-xs">Stylist</p>
                    <p class="text-charcoal font-medium">{{ selectedStylist()?.name ?? 'No preference' }}</p>
                  </div>
                </div>
                <div class="flex gap-3 items-start">
                  <span class="material-icons-round text-gold text-base mt-0.5">calendar_month</span>
                  <div>
                    <p class="text-charcoal/50 text-xs">Date & Time</p>
                    <p class="text-charcoal font-medium">{{ selectedDate() | date:'EEE, d MMM yyyy' }}</p>
                    <p class="text-charcoal font-medium">{{ selectedTime() }}</p>
                  </div>
                </div>
                <div class="border-t border-cream-300 pt-4 mt-4">
                  <div class="flex justify-between">
                    <span class="text-charcoal/60">Starting from</span>
                    <span class="price-tag text-xl">₹{{ selectedService()?.startingPrice }}</span>
                  </div>
                  <p class="text-xs text-charcoal/40 mt-1">Final price confirmed at consultation</p>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <!-- Confirmation success -->
          <div class="card-luxury p-12 md:p-20 text-center animate-scale-in">
            <div class="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold animate-float">
              <span class="material-icons-round text-white text-5xl">check</span>
            </div>
            <h2 class="font-serif text-4xl text-charcoal mb-3">You're All Set!</h2>
            <p class="font-sans text-charcoal/60 text-lg mb-2">Your appointment has been confirmed.</p>
            <p class="font-sans text-charcoal/50 text-sm mb-8">A confirmation email has been sent to your inbox with all the details.</p>
            <div class="card-glass p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
              <div class="flex gap-3">
                <span class="material-icons-round text-gold text-sm">spa</span>
                <p class="font-sans text-sm text-charcoal font-medium">{{ selectedService()?.name }}</p>
              </div>
              <div class="flex gap-3">
                <span class="material-icons-round text-gold text-sm">calendar_month</span>
                <p class="font-sans text-sm text-charcoal font-medium">{{ selectedDate() | date:'EEE, d MMM yyyy' }} at {{ selectedTime() }}</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/" class="btn-primary text-sm">Back to Home</a>
              <a routerLink="/services" class="btn-outline text-sm">Book Another Service</a>
            </div>
          </div>
        }
      </div>
    }

  </div>
</div>
  `,
})
export class BookingComponent {
  private ds = inject(SalonDataService);
  private fb = new FormBuilder();

  services = this.ds.getServices();
  stylists = this.ds.getStylists();

  currentStep = signal<Step>(1);
  selectedService = signal<Service | null>(null);
  selectedStylist = signal<Stylist | null | undefined>(undefined);
  selectedDate = signal<Date | null>(null);
  selectedTime = signal<string | null>(null);
  bookingConfirmed = signal(false);
  confirming = signal(false);
  serviceSearch = '';

  // Calendar state
  private viewDate = new Date();
  calendarMonth = signal(this.formatMonth(this.viewDate));

  detailsForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    phone:     ['', Validators.required],
    notes:     [''],
  });

  steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Stylist' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Confirm' },
  ];

  progressWidth = computed(() => {
    return `${((this.currentStep() - 1) / 3) * 100}%`;
  });

  filteredBookingServices = computed(() => {
    const q = this.serviceSearch.toLowerCase();
    return this.services.filter(s => !q || s.name.toLowerCase().includes(q) || s.category.includes(q));
  });

  timeSlots = [
    { time: '9:00am', available: true }, { time: '9:30am', available: false },
    { time: '10:00am', available: true }, { time: '10:30am', available: true },
    { time: '11:00am', available: true }, { time: '11:30am', available: false },
    { time: '12:00pm', available: false }, { time: '12:30pm', available: true },
    { time: '1:00pm', available: true }, { time: '2:00pm', available: true },
    { time: '2:30pm', available: true }, { time: '3:00pm', available: false },
    { time: '3:30pm', available: true }, { time: '4:00pm', available: true },
    { time: '4:30pm', available: true }, { time: '5:00pm', available: true },
    { time: '5:30pm', available: false }, { time: '6:00pm', available: true },
  ];

  calendarCells = computed(() => {
    const today = new Date();
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: Date | null; day: number | null; past: boolean }[] = [];
    for (let i = 0; i < firstDay; i++) cells.push({ date: null, day: null, past: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      cells.push({ date, day: d, past: date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) });
    }
    return cells;
  });

  selectService(s: Service) { this.selectedService.set(s); }
  selectDate(d: Date) { this.selectedDate.set(d); this.selectedTime.set(null); }
  selectTime(t: string) { this.selectedTime.set(t); }

  nextStep() {
    if (this.currentStep() < 4) this.currentStep.update(s => (s + 1) as Step);
  }
  prevStep() {
    if (this.currentStep() > 1) this.currentStep.update(s => (s - 1) as Step);
  }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.calendarMonth.set(this.formatMonth(this.viewDate));
  }
  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.calendarMonth.set(this.formatMonth(this.viewDate));
  }

  confirmBooking() {
    if (this.detailsForm.invalid) { this.detailsForm.markAllAsTouched(); return; }
    this.confirming.set(true);
    setTimeout(() => { this.confirming.set(false); this.bookingConfirmed.set(true); }, 2000);
  }

  private formatMonth(d: Date) {
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
