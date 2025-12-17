# 💅 Nailsby Hera - Luxury Nail Beauty Studio

A beautiful, modern website for **Nailsby Hera** nail beauty studio in Dubai, with integrated booking system.

## ✨ Features

### For Clients
- 🎨 **Modern, luxurious design** with smooth animations
- 📸 **Photo gallery** showcasing nail art creations
- 📅 **Online booking system** with time slot selection (1h30 sessions)
- 💬 **Contact section** with all information
- 📱 **Fully responsive** - optimized for all devices
- 🌐 **English interface** for international clientele

### For Hera (Admin)
- 🔐 **Secure admin interface** (`/admin`)
- ⏰ **Manage available time slots** by date
- ✅ **Enable/disable slots** easily
- 📋 **View all bookings** with client details
- 🗑️ **Delete slots** as needed

## 🎨 Design

**Modern Color Palette:**
- **Primary (Coral)**: #f0544b - Main brand color
- **Accent (Pink)**: #eb5087 - Feminine luxury accent
- **Neutral**: Clean grays and blacks for text
- **Background**: Pure white with subtle gradients

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed on your machine

### Installation Steps

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open the website**
   - Main site: [http://localhost:3000](http://localhost:3000)
   - Admin interface: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🔑 Admin Access

- **URL**: `/admin`
- **Default password**: `hera2024`

⚠️ **Important**: Change the password in `app/admin/page.tsx` (line ~35)

## 📦 Project Structure

```
hera/
├── app/
│   ├── api/              # API routes for bookings
│   │   ├── book/         # Create booking
│   │   ├── bookings/     # List bookings
│   │   └── slots/        # Manage time slots
│   ├── admin/            # Admin interface
│   ├── layout.tsx        # Main layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Navigation.tsx    # Navigation menu
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Services.tsx      # Services offered
│   ├── Gallery.tsx       # Photo gallery
│   ├── Booking.tsx       # Booking form
│   ├── Contact.tsx       # Contact information
│   └── Footer.tsx        # Footer
├── data/                 # Data storage (auto-created)
│   ├── slots.json        # Available time slots
│   └── bookings.json     # Client bookings
└── public/               # Static files
```

## 🎨 Customization

### Colors
Colors are defined in `tailwind.config.ts` - easy to customize to match brand identity.

### Gallery Images
Replace URLs in `components/Gallery.tsx` (line ~11) with Hera's actual Instagram photos.

### Contact Information
Update information in `components/Contact.tsx` (line ~8).

## 🌐 Deployment

### Option 1: Render (Production)
This repo includes a `render.yaml` blueprint (recommended).

1. Push this repository to GitHub
2. On Render, choose **New → Blueprint**
3. Select the repo
4. Render will provision:
   - a **Web Service** (Node)
   - a **Persistent Disk** mounted at `/var/data` for bookings/slots

Environment variables:
- `DATA_DIR=/var/data` (already configured in `render.yaml`)
- `NODE_ENV=production`

### Option 2: Manual build
```bash
npm run build
npm start
```

## 📱 Usage

### For Clients
1. Browse the website
2. Click "Book Now" in menu
3. Select date and available time slot
4. Fill out the form
5. Receive confirmation

### For Hera (Admin)
1. Go to `/admin`
2. Sign in with password
3. Manage time slots:
   - Select a date
   - Add time slots
   - Enable/disable slots
   - Delete slots
4. View bookings with all client information

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **date-fns** - Date management
- **Lucide React** - Modern icons

## 🔒 Security Notes

⚠️ **Note**: This system uses simple local file storage with JSON. For production use, consider:
- Real database (PostgreSQL, MongoDB, etc.)
- Robust authentication system (Auth0, NextAuth, etc.)
- Email confirmation system
- HTTPS required in production

## 💡 Future Enhancement Ideas

- [ ] Google Calendar integration
- [ ] Automatic email confirmations
- [ ] SMS reminders before appointments
- [ ] Online payment integration
- [ ] Loyalty program
- [ ] Client testimonials
- [ ] Blog/News section
- [ ] Automatic Instagram photo import

## 📞 Support

For questions, contact Hera via:
- Instagram: [@nailsby_hera](https://www.instagram.com/nailsby_hera/)
- Email: contact@nailsbyhera.fr
- Location: Dubai, UAE

---

Made with 💖 for Nailsby Hera in Dubai
