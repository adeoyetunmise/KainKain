# KainKain - Handmade Art & Print Collections

A modern e-commerce platform built with Next.js 16, showcasing handmade art pieces and premium print collections. KainKain offers a seamless shopping experience with an elegant design and smooth animations.

## 🎨 Overview

KainKain is a full-stack e-commerce application that features:
- Curated collections of handmade art and print artwork
- Dynamic product catalog with detailed product pages
- Shopping cart with Zustand state management
- Secure checkout with Paystack payment integration
- Responsive design optimized for all devices
- Smooth animations using Framer Motion
- MongoDB database for transaction management

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16.0.10 (React 19)
- **Styling:** Tailwind CSS v4 with DaisyUI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Icons:** Lucide React & React Icons
- **Font:** Big Shoulders Display (Google Fonts)

### Backend
- **Database:** MongoDB with Mongoose ODM
- **API Routes:** Next.js API Routes
- **Payment:** Paystack Integration

### Development Tools
- **Language:** TypeScript
- **Linting:** ESLint
- **CSS Processing:** PostCSS with Autoprefixer & LightningCSS
- **Package Manager:** pnpm

## 📁 Project Structure

```
KainKain/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── not-found.tsx            # 404 page
│   ├── about/                   # About page
│   ├── api/                     # API routes
│   │   └── transactions/        # Transaction endpoints
│   ├── cart/                    # Shopping cart page
│   ├── checkout/                # Checkout page
│   ├── collections/             # Collection pages
│   │   ├── hand-made/          # Handmade collection
│   │   └── print-art/          # Print art collection
│   ├── newProducts/             # New products page
│   ├── order-success/           # Order confirmation page
│   └── products/                # Product listing & details
│       └── [slug]/             # Dynamic product page
│
├── components/                  # React components
│   ├── ArtistStatement.tsx     # Artist bio component
│   ├── Footer.tsx              # Footer component
│   ├── Hero.tsx                # Hero section
│   ├── HomeProductCard.tsx     # Product card for home
│   ├── Marquee.tsx             # Scrolling marquee
│   ├── MotionWrapper.tsx       # Animation wrapper
│   ├── NavBar.tsx              # Navigation bar
│   ├── ProductList.tsx         # Product listing
│   ├── cart/                   # Cart components
│   ├── checkout/               # Checkout components
│   ├── collections/            # Collection-specific components
│   ├── products/               # Product components
│   └── ui/                     # Reusable UI components
│
├── lib/                        # Utilities and configurations
│   └── database/               # Database setup
│       ├── mongodb.ts          # MongoDB connection
│       └── models/             # Mongoose models
│           └── Transaction.ts  # Transaction schema
│
├── store/                      # State management
│   └── cartStore.ts           # Zustand cart store
│
├── public/                     # Static assets
│   ├── data/                  # JSON product data
│   │   ├── combinedProducts.json
│   │   ├── handMadeData.json
│   │   ├── printArtsData.json
│   │   └── productData.json
│   └── images/                # Image assets
│
└── Configuration Files
    ├── next.config.ts         # Next.js configuration
    ├── tailwind.config.js     # Tailwind CSS config
    ├── tsconfig.json          # TypeScript config
    ├── eslint.config.mjs      # ESLint config
    └── postcss.config.mjs     # PostCSS config
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20.x or higher
- pnpm (recommended) or npm
- MongoDB database (local or Atlas)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/adeoyetunmise/KainKain.git
   cd KainKain
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # Paystack
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   
   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build production-ready application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm cleanup` | Run cleanup script |
| `pnpm build:fresh` | Clean and build fresh |

## 🎯 Features

### Pages
- **Home** (`/`) - Hero section, featured products, and artist statement
- **About** (`/about`) - About the artist and brand
- **Products** (`/products`) - Browse all products
- **Product Details** (`/products/[slug]`) - Individual product page with related items
- **Collections** (`/collections`) - View all collections
  - **Handmade** (`/collections/hand-made`) - Handcrafted pieces
  - **Print Art** (`/collections/print-art`) - Premium prints
- **New Products** (`/newProducts`) - Latest additions
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Secure checkout with Paystack
- **Order Success** (`/order-success`) - Order confirmation

### Key Features
- 🛒 **Shopping Cart** - Add, remove, and update quantities
- 💳 **Secure Payments** - Paystack integration
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Optimized with Next.js 16
- 🎭 **Smooth Animations** - Framer Motion effects
- 🔍 **SEO Optimized** - Meta tags and Open Graph
- 🎨 **Modern UI** - Tailwind CSS with DaisyUI

## 🗄️ Database Schema

### Transaction Model
```typescript
{
  reference: string (unique),
  amount: number,
  status: string,
  customerEmail: string,
  customerName: string,
  items: [{
    productId: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Styling

- **CSS Framework:** Tailwind CSS v4
- **Component Library:** DaisyUI
- **Background Color:** `#ece8e5` (soft cream)
- **Typography:** Big Shoulders Display font family
- **Animations:** Framer Motion for page transitions and interactions

## 🔧 Configuration

### Next.js Configuration
- App Router enabled
- TypeScript support
- Image optimization
- API routes for backend functionality

### Tailwind Configuration
- Custom color schemes
- DaisyUI plugin integration
- Responsive breakpoints

## 📦 State Management

Uses **Zustand** for lightweight state management:
- Cart state (items, quantities, totals)
- Product selections
- Checkout information

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel (Recommended)
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables
Ensure all environment variables are set in your deployment platform:
- `MONGODB_URI`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 📝 License

This project is private and proprietary.

## 👥 Author

**KainKain**
- GitHub: [@adeoyetunmise](https://github.com/adeoyetunmise)

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the repository owner.

---

Built with ❤️ using Next.js and modern web technologies.
