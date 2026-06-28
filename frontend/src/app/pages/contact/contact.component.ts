import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, SectionHeaderComponent],
  template: `
<!-- Hero -->
<section class="relative h-72 md:h-96 flex items-end pb-12 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80"
    alt="Contact" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <p class="font-accent text-gold text-xl mb-2">We'd Love to Hear from You</p>
    <h1 class="font-serif text-5xl md:text-6xl text-white">Contact Us</h1>
  </div>
</section>

<section class="py-24 bg-gradient-luxury">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

      <!-- Contact info sidebar -->
      <div class="space-y-6">
        <div>
          <h2 class="font-serif text-3xl text-charcoal mb-2">Get in Touch</h2>
          <div class="divider-gold mb-4"></div>
          <p class="font-sans text-charcoal/60 text-sm leading-relaxed">Whether you have a question about our services, want to plan a special occasion, or simply want to say hello — we're here for you.</p>
        </div>

        @for (info of contactCards; track info.label) {
          <div class="card-glass p-5 flex items-start gap-4 hover:border-gold/20 transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
              <span class="material-icons-round text-white text-base">{{ info.icon }}</span>
            </div>
            <div>
              <p class="font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1">{{ info.label }}</p>
              <p class="font-sans text-sm font-medium text-charcoal">{{ info.value }}</p>
              @if (info.sub) {
                <p class="font-sans text-xs text-charcoal/40 mt-0.5">{{ info.sub }}</p>
              }
            </div>
          </div>
        }

        <!-- Social media -->
        <div class="card-glass p-5">
          <p class="font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-4">Follow Us</p>
          <div class="flex gap-3">
            @for (social of socials; track social.label) {
              <a [href]="social.href" target="_blank" rel="noopener"
                class="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold hover:scale-110 transition-transform duration-200"
                [attr.aria-label]="social.label">
                <span class="material-icons-round text-white text-base">{{ social.icon }}</span>
              </a>
            }
          </div>
        </div>

        <!-- Business hours -->
        <div class="card-glass p-5">
          <p class="font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-4">Business Hours</p>
          <div class="space-y-2">
            @for (h of hours; track h.day) {
              <div class="flex justify-between items-center">
                <span class="font-sans text-sm text-charcoal/70">{{ h.day }}</span>
                <span class="font-sans text-sm font-medium" [class.text-gold]="!h.closed" [class.text-charcoal-30]="h.closed">
                  {{ h.closed ? 'Closed' : h.open + ' – ' + h.close }}
                </span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Contact form -->
      <div class="lg:col-span-2">
        @if (!submitted()) {
          <div class="card-luxury p-8 md:p-10">
            <h3 class="font-serif text-2xl text-charcoal mb-6">Send Us a Message</h3>
            <form [formGroup]="contactForm" (ngSubmit)="submitForm()" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">First Name *</label>
                  <input formControlName="firstName" class="input-luxury" placeholder="Sophia" />
                  @if (contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched) {
                    <p class="font-sans text-xs text-red-500 mt-1">First name is required.</p>
                  }
                </div>
                <div>
                  <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Last Name *</label>
                  <input formControlName="lastName" class="input-luxury" placeholder="Laurent" />
                  @if (contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched) {
                    <p class="font-sans text-xs text-red-500 mt-1">Last name is required.</p>
                  }
                </div>
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Email Address *</label>
                <input formControlName="email" type="email" class="input-luxury" placeholder="you@example.com" />
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <p class="font-sans text-xs text-red-500 mt-1">Please enter a valid email.</p>
                }
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Phone</label>
                <input formControlName="phone" type="tel" class="input-luxury" placeholder="+44 7700 900000" />
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Topic</label>
                <select formControlName="topic" class="input-luxury">
                  <option value="">Select a topic…</option>
                  <option>Book an Appointment</option>
                  <option>General Enquiry</option>
                  <option>Bridal / Events</option>
                  <option>Membership</option>
                  <option>Gift Vouchers</option>
                  <option>Complaint / Feedback</option>
                </select>
              </div>
              <div>
                <label class="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-2 block">Message *</label>
                <textarea formControlName="message" rows="5" class="input-luxury resize-none"
                  placeholder="Tell us how we can help…"></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <p class="font-sans text-xs text-red-500 mt-1">Please enter a message.</p>
                }
              </div>
              <div class="flex items-start gap-3">
                <input formControlName="consent" type="checkbox" id="consent" class="mt-0.5 accent-gold w-4 h-4" />
                <label for="consent" class="font-sans text-sm text-charcoal/60 leading-relaxed cursor-pointer">
                  I agree to the <a href="#" class="text-gold hover:underline">Privacy Policy</a> and consent to being contacted regarding my enquiry.
                </label>
              </div>
              <button type="submit" [disabled]="contactForm.invalid || submitting()"
                class="btn-primary w-full justify-center text-sm py-4 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (submitting()) {
                  <span class="material-icons-round text-sm animate-spin">refresh</span>
                  Sending…
                } @else {
                  <span class="material-icons-round text-sm">send</span>
                  Send Message
                }
              </button>
            </form>
          </div>
        } @else {
          <div class="card-luxury p-16 text-center animate-scale-in">
            <div class="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold">
              <span class="material-icons-round text-white text-4xl">check</span>
            </div>
            <h3 class="font-serif text-3xl text-charcoal mb-3">Message Sent!</h3>
            <p class="font-sans text-charcoal/60 text-lg mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <a routerLink="/" class="btn-primary text-sm">Back to Home</a>
          </div>
        }

        <!-- Map placeholder -->
        <div class="mt-8 rounded-2xl overflow-hidden shadow-card h-72 bg-cream-200 flex items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000" alt="Map"
            class="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
          <div class="relative text-center">
            <span class="material-icons-round text-gold text-5xl block mb-2">location_on</span>
            <p class="font-serif text-xl text-charcoal">45 Berkeley Square, Mayfair</p>
            <p class="font-sans text-sm text-charcoal/60">London W1J 5AS</p>
            <a href="#" class="btn-primary text-xs mt-4" target="_blank" rel="noopener">Open in Maps</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `,
})
export class ContactComponent {
  private fb = new FormBuilder();
  submitted = signal(false);
  submitting = signal(false);

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    phone:     [''],
    topic:     [''],
    message:   ['', Validators.required],
    consent:   [false, Validators.requiredTrue],
  });

  contactCards = [
    { icon: 'phone', label: 'Call Us', value: '+44 20 7946 0100', sub: 'Mon–Sat 9am–8pm' },
    { icon: 'mail', label: 'Email', value: 'hello@aurasalon.com', sub: 'Reply within 24 hours' },
    { icon: 'location_on', label: 'Mayfair Flagship', value: '45 Berkeley Square, London W1J 5AS', sub: null },
    { icon: 'location_on', label: 'Chelsea Salon', value: "12 King's Road, London SW3 4NW", sub: null },
  ];

  socials = [
    { label: 'Instagram', icon: 'photo_camera', href: '#' },
    { label: 'Facebook', icon: 'facebook', href: '#' },
    { label: 'Pinterest', icon: 'interests', href: '#' },
  ];

  hours = [
    { day: 'Monday – Friday', open: '9:00am', close: '8:00pm', closed: false },
    { day: 'Saturday', open: '9:00am', close: '7:00pm', closed: false },
    { day: 'Sunday', open: '10:00am', close: '5:00pm', closed: false },
    { day: 'Bank Holidays', open: '', close: '', closed: true },
  ];

  submitForm() {
    if (this.contactForm.invalid) { this.contactForm.markAllAsTouched(); return; }
    this.submitting.set(true);
    setTimeout(() => { this.submitting.set(false); this.submitted.set(true); }, 1500);
  }
}
