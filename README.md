# Aura Salon & Spa 💛

> Award-winning luxury hair, skin & spa website — Angular 18 + NestJS + Tailwind CSS

**Live Demo → [https://aura-salon-spa.netlify.app](https://aura-salon-spa.netlify.app)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 18 (standalone, signals, lazy routing) |
| Styling | Tailwind CSS 3 + Angular Material |
| Backend | NestJS (Node.js) |
| Frontend Hosting | Netlify (free) |
| Backend Hosting | Render (free) |

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, search, services, offers, stylists, gallery, blog, FAQ |
| `/services` | All 18 services with category filter & search |
| `/gallery` | Before & After, transformations, bridal, videos |
| `/booking` | 4-step appointment wizard |
| `/membership` | Silver / Gold / Platinum plans |
| `/about` | Team, awards, milestone timeline |
| `/contact` | Contact form, map, business hours |
| `/salon/:id` | Salon detail page |

## Getting Started

```bash
# Frontend
cd frontend
npm install
npm start          # http://localhost:4200

# Backend
cd backend
npm install
npm run start:dev  # http://localhost:3001/api
```

## Deploy

### Frontend — Netlify
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist/frontend/browser
```

### Backend — Render
Connect your GitHub repo on [render.com](https://render.com) and point it to the `backend` directory using the included `render.yaml`.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/appointments` | Create appointment |
| `GET` | `/api/appointments` | List appointments |
| `GET` | `/api/appointments/:id` | Get single appointment |
| `PATCH` | `/api/appointments/:id/cancel` | Cancel appointment |
| `GET` | `/api/services` | List all services |
| `GET` | `/api/services?category=hair` | Filter by category |
| `POST` | `/api/contact` | Submit contact form |
