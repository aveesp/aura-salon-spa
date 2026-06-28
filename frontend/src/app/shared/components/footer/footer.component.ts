import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
<footer class="bg-charcoal text-cream-200">
  <!-- Top CTA strip -->
  <div class="bg-gradient-gold py-10 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <p class="font-accent text-2xl text-white/80 mb-2">Ready for your transformation?</p>
      <h2 class="font-serif text-3xl md:text-4xl text-white mb-6">Book Your Appointment Today</h2>
      <a routerLink="/booking" class="btn-white text-sm">
        <span class="material-icons-round text-base">calendar_month</span>
        Reserve Your Visit
      </a>
    </div>
  </div>

  <!-- Main footer -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <!-- Brand -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-2 mb-5">
          <div class="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
            <span class="text-white font-serif text-lg font-bold">A</span>
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-serif text-xl font-semibold text-white">Aura</span>
            <span class="font-sans text-xs tracking-[0.2em] uppercase text-cream-300/60">Salon & Spa</span>
          </div>
        </div>
        <p class="font-sans text-sm text-cream-300/70 leading-relaxed mb-6">
          Award-winning luxury hair, skin, and beauty treatments. Crafting confidence, one appointment at a time.
        </p>
        <div class="flex items-center gap-3">
          @for (social of socials; track social.label) {
            <a [href]="social.href" target="_blank" rel="noopener"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors duration-200"
              [attr.aria-label]="social.label">
              <span class="material-icons-round text-base text-cream-300">{{ social.icon }}</span>
            </a>
          }
        </div>
      </div>

      <!-- Services -->
      <div>
        <h4 class="font-sans text-sm font-semibold tracking-widest uppercase text-gold mb-5">Services</h4>
        <ul class="space-y-3">
          @for (s of serviceLinks; track s) {
            <li><a routerLink="/services" class="font-sans text-sm text-cream-300/70 hover:text-gold transition-colors duration-200">{{ s }}</a></li>
          }
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 class="font-sans text-sm font-semibold tracking-widest uppercase text-gold mb-5">Company</h4>
        <ul class="space-y-3">
          @for (l of companyLinks; track l.label) {
            <li><a [routerLink]="l.route" class="font-sans text-sm text-cream-300/70 hover:text-gold transition-colors duration-200">{{ l.label }}</a></li>
          }
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-sans text-sm font-semibold tracking-widest uppercase text-gold mb-5">Visit Us</h4>
        <address class="not-italic space-y-4">
          <div class="flex gap-3">
            <span class="material-icons-round text-gold text-base mt-0.5">location_on</span>
            <p class="font-sans text-sm text-cream-300/70">45 Berkeley Square, Mayfair, London W1J 5AS</p>
          </div>
          <div class="flex gap-3">
            <span class="material-icons-round text-gold text-base">phone</span>
            <a href="tel:+442079460100" class="font-sans text-sm text-cream-300/70 hover:text-gold">+44 20 7946 0100</a>
          </div>
          <div class="flex gap-3">
            <span class="material-icons-round text-gold text-base">mail</span>
            <a href="mailto:hello@aurasalon.com" class="font-sans text-sm text-cream-300/70 hover:text-gold">hello&#64;aurasalon.com</a>
          </div>
          <div class="flex gap-3">
            <span class="material-icons-round text-gold text-base">schedule</span>
            <div class="font-sans text-sm text-cream-300/70">
              <p>Mon–Fri: 9am – 8pm</p>
              <p>Sat: 9am – 7pm</p>
              <p>Sun: 10am – 5pm</p>
            </div>
          </div>
        </address>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="mt-12 pt-8 border-t border-white/10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p class="font-serif text-lg text-white">Get beauty tips & exclusive offers</p>
          <p class="font-sans text-sm text-cream-300/60 mt-1">Join 12,000+ subscribers. No spam, unsubscribe anytime.</p>
        </div>
        <form class="flex gap-2 w-full md:w-auto" (submit)="subscribe($event)">
          <input type="email" placeholder="Your email address" required
            class="input-luxury bg-white/5 border-white/20 text-cream-100 placeholder:text-cream-300/40 w-full md:w-72"/>
          <button type="submit" class="btn-primary text-xs py-3 px-5 whitespace-nowrap">Subscribe</button>
        </form>
      </div>
    </div>

    <!-- Bottom -->
    <div class="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-sans text-xs text-cream-300/50">© {{ year }} Aura Salon & Spa. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="font-sans text-xs text-cream-300/50 hover:text-gold transition-colors">Privacy Policy</a>
        <a href="#" class="font-sans text-xs text-cream-300/50 hover:text-gold transition-colors">Terms of Service</a>
        <a href="#" class="font-sans text-xs text-cream-300/50 hover:text-gold transition-colors">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    { label: 'Instagram', icon: 'photo_camera', href: '#' },
    { label: 'Facebook', icon: 'facebook', href: '#' },
    { label: 'Twitter', icon: 'alternate_email', href: '#' },
    { label: 'YouTube', icon: 'play_circle', href: '#' },
  ];

  serviceLinks = [
    'Hair Cut & Styling', 'Hair Colouring', 'Hair Spa',
    'Luxury Facials', 'Massage & Spa', 'Nail Art',
    'Bridal Makeup', 'Men\'s Grooming',
  ];

  companyLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Our Team', route: '/about' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Membership', route: '/membership' },
    { label: 'Gift Vouchers', route: '/contact' },
    { label: 'Careers', route: '/contact' },
    { label: 'Contact', route: '/contact' },
  ];

  subscribe(e: Event) {
    e.preventDefault();
    // Would call API in production
  }
}
