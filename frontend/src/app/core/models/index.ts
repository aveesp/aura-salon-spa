export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  startingPrice: number;
  image: string;
  tags: string[];
  popular?: boolean;
}

export type ServiceCategory =
  | 'hair' | 'skin' | 'massage' | 'nails' | 'makeup' | 'spa' | 'men' | 'kids';

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  instagram?: string;
}

export interface Salon {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  images: string[];
  services: string[];
  workingHours: WorkingHours[];
  phone: string;
  email: string;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  slug: string;
}

export interface MembershipPlan {
  id: string;
  name: 'Silver' | 'Gold' | 'Platinum';
  price: number;
  period: 'month' | 'year';
  color: string;
  icon: string;
  benefits: string[];
  discount: number;
  highlight?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  validUntil: string;
  code?: string;
}

export interface GalleryItem {
  id: string;
  type: 'before-after' | 'transformation' | 'bridal' | 'interior' | 'video';
  title: string;
  beforeImage?: string;
  afterImage?: string;
  image?: string;
  videoUrl?: string;
  tags: string[];
}

export interface BookingRequest {
  serviceId: string;
  stylistId?: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
