# Ghostwire - Futuristic Social Media Platform

A next-generation social media platform built with modern technologies, designed for creating communities and sharing moments with a masculine, hyper-realistic futuristic aesthetic.

## 🚀 Features

- **Wire (Like)**: Quick reactions to posts powered by energy
- **Comments**: Engage in detailed conversations
- **Support (Repost)**: Amplify and share posts with your network
- **Share**: Direct sharing functionality
- **Image Uploads**: Post with multiple images
- **Location Tagging**: Add location to your posts
- **Communities**: Create and manage groups with shared interests
- **Futuristic Design**: Dark theme with cyan/tech accents (no purple)
- **SVG Icons**: Using Lucide React for modern icon system

## 🛠 Tech Stack

- **Frontend**: Next.js 16+ with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL serverless)
- **Icons**: Lucide React (SVG-based)
- **Authentication**: Supabase Auth (ready to integrate)
- **Real-time**: Supabase Realtime (ready to integrate)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://db.jojvzzlkanbvofbyyjgm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres
   ```

   **To get your keys:**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Select your project
   - Navigate to Settings → API
   - Copy `anon (public)` key and `service_role` key

3. **Create database tables**

   See [SETUP.md](./SETUP.md) for detailed instructions on creating the database schema using SQL.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ghostwire/
├── src/
│   ├── app/
│   │   ├── feed/              # Feed page with post display
│   │   ├── communities/       # Communities discovery page
│   │   ├── create/            # Create post page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home/landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar (sticky)
│   │   ├── PostCard.tsx       # Post display component
│   │   ├── CreatePostModal.tsx # Post creation modal
│   │   └── CommunityCard.tsx  # Community display component
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client setup
│   │   ├── theme.ts           # Theme configuration
│   │   └── api/               # API functions
│   │       └── index.ts       # API integration layer
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── migrations/
│   └── 001_create_tables.sql  # Database schema
├── public/                    # Static assets
├── .env.local                 # Environment variables (⚠️ don't commit)
├── SETUP.md                   # Database setup guide
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

## 🎨 Design System

### Color Palette (No Purple!)

- **Primary**: Cyan (#00D9FF) - Main accent and interactive elements
- **Secondary**: Dark Charcoal (#1F2937)
- **Background**: Almost Black (#0F1419)
- **Surface**: Dark Surface (#1A1F2E)
- **Accent**: Orange (#FF6B35) - Secondary highlights
- **Text**: Almost White (#F0F4F8)

### Typography

- **Font**: System UI sans-serif
- **Headings**: Bold weights with gradient text option
- **Body**: Regular weight with proper line height

### Interactive Elements

- Smooth transitions and hover effects
- Glow effects on hover for futuristic feel
- SVG icon scaling on interactions
- Rounded borders with subtle shadows

## 🔌 API Integration

The platform includes a complete API layer for Supabase integration:

### Available APIs

- **Posts API** - Create, read, delete posts
- **Comments API** - Manage post comments
- **Interactions API** - Wire, support, and share interactions
- **Communities API** - Manage communities and memberships
- **Users API** - User profile management

### Usage Example

```typescript
import { postsAPI, communitiesAPI } from '@/lib/api'

// Get all posts
const posts = await postsAPI.getPosts()

// Create a post
const newPost = await postsAPI.createPost(
  userId,
  'Check this out!',
  imageUrls,
  'San Francisco, CA'
)

// Join a community
await communitiesAPI.joinCommunity(communityId, userId)
```

## 🔒 Security Notes

⚠️ **Important**: Never commit sensitive information!

- `.env.local` is in `.gitignore` - it will NOT be committed
- Database credentials are stored only in environment variables
- Use `.env.production.local` for production credentials
- Always use row-level security (RLS) policies in Supabase

## 📝 Database Schema

### Tables

1. **users** - User profiles with bio and avatar
2. **posts** - Social media posts with images and location
3. **comments** - Post comments
4. **communities** - Community groups
5. **community_members** - Community membership tracking
6. **post_interactions** - Wire/comment/support/share tracking

See [migrations/001_create_tables.sql](./migrations/001_create_tables.sql) for full schema.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Environment Variables for Production

Add these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

## 📚 Components

### Navbar

Sticky navigation with logo, menu items, and mobile responsive design.

### PostCard

Display posts with interaction buttons (wire, comment, support, share).

### CreatePostModal

Modal for creating new posts with image upload and location tagging.

### CommunityCard

Display community info with join/leave functionality.

## 🎯 Next Steps / TODO

- [ ] Integrate Supabase Authentication
- [ ] Implement real-time updates with Supabase Realtime
- [ ] Add image upload to Supabase Storage
- [ ] User profiles page
- [ ] Notifications system
- [ ] Search functionality
- [ ] Trending posts
- [ ] Direct messaging
- [ ] User following system
- [ ] Analytics dashboard

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support & Setup

For detailed setup instructions, see [SETUP.md](./SETUP.md).

---

**Built with ⚡ by Ghostwire Team**
