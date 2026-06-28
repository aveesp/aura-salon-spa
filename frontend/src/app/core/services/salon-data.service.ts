import { Injectable, signal } from '@angular/core';
import {
  Service, Stylist, Testimonial, BlogPost, MembershipPlan,
  Offer, GalleryItem, Salon,
} from '../models';

const UNSPLASH = 'https://images.unsplash.com';

@Injectable({ providedIn: 'root' })
export class SalonDataService {

  readonly darkMode = signal(false);

  toggleDarkMode() {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark');
  }

  getServices(): Service[] {
    return [
      { id: 's1', name: 'Classic Haircut', category: 'hair', description: 'Precision cut tailored to your face shape and lifestyle by our expert stylists.', duration: 45, startingPrice: 65, image: `${UNSPLASH}/photo-1560066984-138dadb4c035?w=600`, tags: ['popular', 'express'], popular: true },
      { id: 's2', name: 'Hair Styling', category: 'hair', description: 'From sleek blowouts to glamorous waves — styled to perfection for any occasion.', duration: 60, startingPrice: 85, image: `${UNSPLASH}/photo-1522337360788-8b13dee7a37e?w=600`, tags: ['trending'] },
      { id: 's3', name: 'Hair Coloring', category: 'hair', description: 'Balayage, highlights, ombré, and vivid colors crafted by our colour specialists.', duration: 120, startingPrice: 140, image: `${UNSPLASH}/photo-1562322140-8baeececf3df?w=600`, tags: ['popular', 'premium'], popular: true },
      { id: 's4', name: 'Hair Spa', category: 'hair', description: 'Deep conditioning treatment to restore shine, strength, and vitality to your hair.', duration: 75, startingPrice: 95, image: `${UNSPLASH}/photo-1540555700478-4be289fbecef?w=600`, tags: ['relaxing'] },
      { id: 's5', name: 'Luxury Facial', category: 'skin', description: 'Customised facial using premium ingredients to reveal radiant, glowing skin.', duration: 90, startingPrice: 120, image: `${UNSPLASH}/photo-1515377905703-c4788e51af15?w=600`, tags: ['popular', 'premium'], popular: true },
      { id: 's6', name: 'Deep Cleanup', category: 'skin', description: 'Thorough cleansing ritual to purify pores and refresh your complexion.', duration: 60, startingPrice: 75, image: `${UNSPLASH}/photo-1487412912498-0447578fcca8?w=600`, tags: ['express'] },
      { id: 's7', name: 'Swedish Massage', category: 'massage', description: 'Classic full-body massage to melt away stress and restore total relaxation.', duration: 90, startingPrice: 110, image: `${UNSPLASH}/photo-1600334089648-b0d9d3028eb2?w=600`, tags: ['relaxing', 'popular'], popular: true },
      { id: 's8', name: 'Spa Package', category: 'spa', description: 'Curated spa journey — facial, massage, and body ritual in one blissful session.', duration: 180, startingPrice: 280, image: `${UNSPLASH}/photo-1544161515-4ab6ce6db874?w=600`, tags: ['premium', 'package'] },
      { id: 's9', name: 'Body Treatment', category: 'spa', description: 'Exfoliating and hydrating body wrap using botanical extracts for silky skin.', duration: 75, startingPrice: 130, image: `${UNSPLASH}/photo-1570172619644-dfd03ed5d881?w=600`, tags: ['premium'] },
      { id: 's10', name: 'Full Waxing', category: 'skin', description: 'Smooth, long-lasting hair removal using premium wax for minimal discomfort.', duration: 60, startingPrice: 60, image: `${UNSPLASH}/photo-1607779097040-26e80aa78e66?w=600`, tags: [] },
      { id: 's11', name: 'Threading', category: 'skin', description: 'Precise eyebrow and face threading for perfectly defined brows.', duration: 20, startingPrice: 18, image: `${UNSPLASH}/photo-1616394584738-fc6e612e71b9?w=600`, tags: ['express'] },
      { id: 's12', name: 'Pedicure', category: 'nails', description: 'Rejuvenating foot care with exfoliation, massage, and polished nails.', duration: 60, startingPrice: 55, image: `${UNSPLASH}/photo-1604654894610-df63bc536371?w=600`, tags: ['popular'] },
      { id: 's13', name: 'Manicure', category: 'nails', description: 'Hand care ritual with cuticle treatment, shaping, and polish of your choice.', duration: 45, startingPrice: 45, image: `${UNSPLASH}/photo-1604654894610-df63bc536371?w=600`, tags: [] },
      { id: 's14', name: 'Nail Art', category: 'nails', description: 'Creative designs from minimalist to elaborate — a canvas on every nail.', duration: 90, startingPrice: 70, image: `${UNSPLASH}/photo-1604654894610-df63bc536371?w=600`, tags: ['trending'] },
      { id: 's15', name: 'Bridal Makeup', category: 'makeup', description: 'Flawless bridal looks crafted to last all day, from natural to glamorous.', duration: 120, startingPrice: 250, image: `${UNSPLASH}/photo-1519741497674-611481863552?w=600`, tags: ['premium', 'bridal'], popular: true },
      { id: 's16', name: 'Party Makeup', category: 'makeup', description: 'Event-ready makeup tailored to your outfit, theme, and personal style.', duration: 75, startingPrice: 120, image: `${UNSPLASH}/photo-1487412912498-0447578fcca8?w=600`, tags: [] },
      { id: 's17', name: 'Beard Styling', category: 'men', description: 'Hot towel shave, trim, and beard sculpting for the modern gentleman.', duration: 45, startingPrice: 55, image: `${UNSPLASH}/photo-1503951914875-452162b0f3f1?w=600`, tags: ['men'] },
      { id: 's18', name: 'Kids Haircut', category: 'kids', description: 'Gentle, fun haircuts for little ones in a welcoming environment.', duration: 30, startingPrice: 35, image: `${UNSPLASH}/photo-1560066984-138dadb4c035?w=600`, tags: ['kids'] },
    ];
  }

  getStylists(): Stylist[] {
    return [
      { id: 'st1', name: 'Sophia Laurent', role: 'Creative Director & Senior Stylist', specialty: ['Balayage', 'Precision Cuts', 'Bridal'], bio: '15 years of luxury salon expertise. Trained in Paris and New York.', image: `${UNSPLASH}/photo-1580618672591-eb180b1a973f?w=400`, rating: 4.9, reviewCount: 312, experience: 15, instagram: '@sophialaurent' },
      { id: 'st2', name: 'Marcus Chen', role: 'Colour Specialist', specialty: ['Vivid Colour', 'Highlights', 'Ombré'], bio: 'International award-winning colourist with an eye for dimension and tone.', image: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=400`, rating: 4.8, reviewCount: 248, experience: 10, instagram: '@marcuschen' },
      { id: 'st3', name: 'Isabella Rose', role: 'Skin & Wellness Expert', specialty: ['Facials', 'Body Treatments', 'Holistic Spa'], bio: 'Certified aesthetician passionate about skin health and holistic beauty.', image: `${UNSPLASH}/photo-1438761681033-6461ffad8d80?w=400`, rating: 4.9, reviewCount: 185, experience: 8, instagram: '@isabellarose' },
      { id: 'st4', name: 'James Rivera', role: 'Barber & Men\'s Grooming', specialty: ['Classic Shaves', 'Beard Sculpting', 'Men\'s Cuts'], bio: 'Traditional barber craft meets modern techniques for the discerning gentleman.', image: `${UNSPLASH}/photo-1472099645785-5658abf4ff4e?w=400`, rating: 4.7, reviewCount: 210, experience: 12, instagram: '@jamesrivera' },
      { id: 'st5', name: 'Priya Sharma', role: 'Makeup Artist', specialty: ['Bridal', 'Editorial', 'Airbrush'], bio: 'Featured in Vogue India, Elle, and Harper\'s Bazaar. Bridal specialist.', image: `${UNSPLASH}/photo-1487412912498-0447578fcca8?w=400`, rating: 5.0, reviewCount: 164, experience: 9, instagram: '@priyamakeupart' },
      { id: 'st6', name: 'Emma Walsh', role: 'Nail Artist', specialty: ['Nail Art', 'Gel Extensions', 'Luxury Manicure'], bio: 'Transforming nails into miniature works of art with precision and creativity.', image: `${UNSPLASH}/photo-1544005313-94ddf0286df2?w=400`, rating: 4.8, reviewCount: 198, experience: 7 },
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      { id: 't1', name: 'Amelia Davidson', avatar: `${UNSPLASH}/photo-1494790108377-be9c29b29330?w=100`, rating: 5, review: 'Absolutely transformed my hair! Sophia understood exactly what I wanted. The salon ambiance is divine — I felt like royalty from the moment I walked in.', service: 'Balayage & Cut', date: '2024-11-15', verified: true },
      { id: 't2', name: 'Rachel Kim', avatar: `${UNSPLASH}/photo-1517841905240-472988babdf9?w=100`, rating: 5, review: 'The bridal makeup by Priya was beyond perfect. My photos look incredible. Worth every penny — she truly is an artist.', service: 'Bridal Makeup', date: '2024-10-28', verified: true },
      { id: 't3', name: 'David Chen', avatar: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=100`, rating: 5, review: 'Best beard sculpt I\'ve ever had. James takes time to understand your face shape and really crafts something special. The hot towel finish is next level.', service: 'Beard Styling', date: '2024-11-02', verified: true },
      { id: 't4', name: 'Sarah Mitchell', avatar: `${UNSPLASH}/photo-1531746020798-e6953c6e8e04?w=100`, rating: 5, review: 'The luxury spa package was a revelation. Three hours of pure bliss. Isabella is so knowledgeable and the products they use are exquisite.', service: 'Luxury Spa Package', date: '2024-11-08', verified: true },
      { id: 't5', name: 'Olivia Fernandez', avatar: `${UNSPLASH}/photo-1534528741775-53994a69daeb?w=100`, rating: 5, review: 'Marcus turned my dull, damaged hair into vibrant, healthy locks in one session. The colour is stunning and everyone keeps asking for my stylist\'s name!', service: 'Vivid Hair Colour', date: '2024-10-20', verified: true },
      { id: 't6', name: 'Natalie Park', avatar: `${UNSPLASH}/photo-1488426862026-3ee34a7d66df?w=100`, rating: 5, review: 'Emma\'s nail art is pure magic. She created the most intricate floral design — I almost didn\'t want to do anything with my hands for fear of ruining them!', service: 'Nail Art', date: '2024-11-12', verified: true },
    ];
  }

  getBlogPosts(): BlogPost[] {
    return [
      { id: 'b1', title: 'The Art of Balayage: What Makes It Different', excerpt: 'Discover why balayage has become the most sought-after hair colouring technique and how our experts achieve those sun-kissed, natural results.', image: `${UNSPLASH}/photo-1562322140-8baeececf3df?w=800`, category: 'Hair', author: 'Sophia Laurent', date: '2024-11-10', readTime: 4, slug: 'art-of-balayage' },
      { id: 'b2', title: '10 Skincare Rituals for Winter Radiance', excerpt: 'As temperatures drop, your skin needs extra care. Our skin specialist shares her top winter skincare routines that keep your complexion glowing.', image: `${UNSPLASH}/photo-1515377905703-c4788e51af15?w=800`, category: 'Skincare', author: 'Isabella Rose', date: '2024-11-05', readTime: 5, slug: 'winter-skincare-rituals' },
      { id: 'b3', title: 'Bridal Beauty Timeline: 6 Months to Your Big Day', excerpt: 'Planning your wedding beauty treatments? Isabella and Priya share the ultimate timeline for brides who want to look and feel their absolute best.', image: `${UNSPLASH}/photo-1519741497674-611481863552?w=800`, category: 'Bridal', author: 'Priya Sharma', date: '2024-10-28', readTime: 6, slug: 'bridal-beauty-timeline' },
    ];
  }

  getMembershipPlans(): MembershipPlan[] {
    return [
      {
        id: 'mp1', name: 'Silver', price: 49, period: 'month',
        color: 'from-slate-400 to-slate-500', icon: '✦',
        benefits: ['10% off all services', 'Priority booking', 'Monthly blowout', 'Birthday gift voucher', 'Exclusive member events'],
        discount: 10,
      },
      {
        id: 'mp2', name: 'Gold', price: 99, period: 'month',
        color: 'from-gold-200 to-gold-400', icon: '✦✦',
        benefits: ['20% off all services', 'Priority booking', 'Monthly hair treatment', '2 free express treatments', 'Birthday luxury gift', 'Member-only events', 'Dedicated stylist'],
        discount: 20, highlight: true,
      },
      {
        id: 'mp3', name: 'Platinum', price: 199, period: 'month',
        color: 'from-lavender-200 to-lavender-400', icon: '✦✦✦',
        benefits: ['30% off all services', 'VIP priority booking', 'Unlimited blowouts', '4 free premium treatments', 'Complimentary spa session', 'Exclusive Platinum events', 'Personal stylist concierge', 'Home visit available'],
        discount: 30,
      },
    ];
  }

  getOffers(): Offer[] {
    return [
      { id: 'o1', title: 'New Client Special', description: 'First-time visitors receive 20% off any service. Experience the Aura difference at an exclusive introductory rate.', discount: '20% OFF', image: `${UNSPLASH}/photo-1560066984-138dadb4c035?w=600`, validUntil: '2025-01-31', code: 'NEWCLIENT20' },
      { id: 'o2', title: 'Bridal Package', description: 'Book our full bridal package and receive a complimentary pre-wedding trial session for the bride.', discount: 'FREE TRIAL', image: `${UNSPLASH}/photo-1519741497674-611481863552?w=600`, validUntil: '2025-03-31' },
      { id: 'o3', title: 'Midweek Luxury', description: 'Treat yourself Monday–Wednesday and receive a complimentary scalp treatment or hand massage.', discount: 'FREE ADD-ON', image: `${UNSPLASH}/photo-1544161515-4ab6ce6db874?w=600`, validUntil: '2025-01-15' },
    ];
  }

  getGalleryItems(): GalleryItem[] {
    return [
      { id: 'g1', type: 'before-after', title: 'Brunette to Blonde Balayage', beforeImage: `${UNSPLASH}/photo-1522337360788-8b13dee7a37e?w=500`, afterImage: `${UNSPLASH}/photo-1562322140-8baeececf3df?w=500`, tags: ['hair', 'colour'] },
      { id: 'g2', type: 'transformation', title: 'Dramatic Colour Transformation', image: `${UNSPLASH}/photo-1560066984-138dadb4c035?w=600`, tags: ['hair', 'colour'] },
      { id: 'g3', type: 'bridal', title: 'Ethereal Bridal Look', image: `${UNSPLASH}/photo-1519741497674-611481863552?w=600`, tags: ['bridal', 'makeup'] },
      { id: 'g4', type: 'transformation', title: 'Vivid Fantasy Colour', image: `${UNSPLASH}/photo-1522337360788-8b13dee7a37e?w=600`, tags: ['hair', 'colour', 'vivid'] },
      { id: 'g5', type: 'bridal', title: 'Classic Bridal Updo', image: `${UNSPLASH}/photo-1487412912498-0447578fcca8?w=600`, tags: ['bridal', 'updo'] },
      { id: 'g6', type: 'transformation', title: 'Keratin Smoothing Treatment', image: `${UNSPLASH}/photo-1540555700478-4be289fbecef?w=600`, tags: ['hair', 'treatment'] },
      { id: 'g7', type: 'before-after', title: 'Skin Transformation Facial', beforeImage: `${UNSPLASH}/photo-1515377905703-c4788e51af15?w=500`, afterImage: `${UNSPLASH}/photo-1487412912498-0447578fcca8?w=500`, tags: ['skin', 'facial'] },
      { id: 'g8', type: 'transformation', title: 'Sculpted Nail Art', image: `${UNSPLASH}/photo-1604654894610-df63bc536371?w=600`, tags: ['nails'] },
    ];
  }

  getSalons(): Salon[] {
    return [
      {
        id: 'salon1', name: 'Aura – Mayfair', tagline: 'Our flagship luxury salon in the heart of London',
        address: '45 Berkeley Square', city: 'London', rating: 4.9, reviewCount: 842,
        images: [`${UNSPLASH}/photo-1560066984-138dadb4c035?w=800`],
        services: ['Hair', 'Nails', 'Spa', 'Makeup'],
        workingHours: [
          { day: 'Mon–Fri', open: '09:00', close: '20:00' },
          { day: 'Saturday', open: '09:00', close: '19:00' },
          { day: 'Sunday', open: '10:00', close: '17:00' },
        ],
        phone: '+44 20 7946 0100', email: 'mayfair@aurasalon.com',
      },
      {
        id: 'salon2', name: 'Aura – Chelsea', tagline: 'Serene beauty sanctuary in Chelsea',
        address: '12 King\'s Road', city: 'London', rating: 4.8, reviewCount: 614,
        images: [`${UNSPLASH}/photo-1544161515-4ab6ce6db874?w=800`],
        services: ['Hair', 'Spa', 'Facials'],
        workingHours: [
          { day: 'Mon–Fri', open: '09:00', close: '19:00' },
          { day: 'Saturday', open: '10:00', close: '18:00' },
          { day: 'Sunday', open: '', close: '', closed: true },
        ],
        phone: '+44 20 7946 0200', email: 'chelsea@aurasalon.com',
      },
    ];
  }
}
