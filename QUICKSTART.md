# 🚀 Ghostwire - Quick Start Guide

## What You Got

You now have a fully functional social media platform called **Ghostwire** with:

✅ **Complete Next.js setup** - TypeScript, Tailwind CSS, and modern tooling
✅ **Futuristic UI** - Masculine, hyper-realistic design with cyan/tech accents (NO purple)
✅ **Core Features** - Wire (like), comment, support (repost), and share buttons
✅ **Image Uploads** - Users can post images and add captions with location
✅ **Communities** - Create and manage groups/communities
✅ **SVG Icons** - Lucide React icons throughout
✅ **Supabase Integration** - Ready-to-use API layer for all features
✅ **Database Schema** - All tables pre-designed

## 📋 Setup Instructions

### Step 1: Update Environment Variables

Edit `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://db.jojvzzlkanbvofbyyjgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Get from Supabase Dashboard → Settings → API]
SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard → Settings → API]
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres
```

### Step 2: Create Database Tables

**Option A: Using Supabase SQL Editor (Easiest)**

1. Open [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to SQL Editor → New Query
4. Copy the entire content from `migrations/001_create_tables.sql`
5. Paste and click "Run"

**Option B: Using psql CLI**

```bash
psql postgresql://postgres:[YOUR-PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres < migrations/001_create_tables.sql
```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Project Pages

| Page | Path | Purpose |
|------|------|---------|
| **Home** | `/` | Landing page with features |
| **Feed** | `/feed` | View posts, wire, comment, support, share |
| **Communities** | `/communities` | Discover and join communities |
| **Create** | `/create` | Create new posts (modal) |

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app routes
│   ├── page.tsx           # Home page with hero
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles (futuristic theme)
│   ├── feed/page.tsx      # Feed with demo posts
│   ├── communities/page.tsx # Communities discovery
│   └── create/page.tsx    # Create post redirect
│
├── components/            # React components
│   ├── Navbar.tsx        # Top navigation (sticky)
│   ├── PostCard.tsx      # Individual post display
│   ├── CreatePostModal.tsx # Post creation form
│   └── CommunityCard.tsx # Community card
│
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── theme.ts          # Theme configuration
│   └── api/index.ts      # Complete API layer
│
└── types/index.ts        # TypeScript interfaces
```

## 🎨 Design Highlights

**Colors** (No Purple!):
- Cyan (#00D9FF) - Primary brand color
- Orange (#FF6B35) - Secondary accent
- Dark surfaces for that futuristic vibe

**Components**:
- Smooth animations and transitions
- Glow effects on hover
- Icon scaling on interactions
- Responsive design (mobile-first)

## 🔌 API Ready

The platform includes a complete API layer in `src/lib/api/index.ts`:

```typescript
// Posts
await postsAPI.getPosts()
await postsAPI.createPost(userId, content, images, location)

// Communities  
await communitiesAPI.getCommunities()
await communitiesAPI.joinCommunity(communityId, userId)

// Interactions
await interactionsAPI.addInteraction(postId, userId, 'wire')
await commentsAPI.createComment(postId, userId, content)

// And more...
```

## ⚠️ Important Security Notes

**DO NOT commit `.env.local`** - It's already in `.gitignore`

✅ Safe to commit:
- All source code
- Components and pages
- Configuration files (tsconfig, tailwind.config, next.config)
- `.gitignore` and LICENSE

❌ NEVER commit:
- `.env.local` - Contains your database password!
- Any secrets or API keys
- Private credentials

## 🎬 Features Working

### ✅ Implemented

1. **Navigation** - Sticky navbar with all main pages
2. **Home Page** - Hero section with feature cards
3. **Feed** - Display posts with demo data
4. **Post Cards** - With wire/comment/support/share buttons
5. **Create Post Modal** - Upload images, add location
6. **Communities** - Browse, search, join/leave communities
7. **UI/UX** - Fully designed with futuristic theme
8. **SVG Icons** - Lucide React integrated throughout
9. **Responsive** - Mobile, tablet, desktop optimized

### ⏳ Ready to Integrate

1. **Authentication** - Supabase Auth setup
2. **Real-time** - Supabase Realtime subscriptions
3. **Image Storage** - Supabase Storage integration
4. **Database** - All tables and schema ready

## 🚀 Next Steps

1. **Connect Supabase** - Follow Step 1-2 above
2. **Test API** - Use provided API functions
3. **Add Auth** - Integrate Supabase Authentication
4. **Deploy** - Push to Vercel or your hosting

## 📚 Key Files to Understand

- `src/lib/api/index.ts` - All database operations
- `src/components/PostCard.tsx` - Post display logic
- `src/app/feed/page.tsx` - Feed with interactions
- `src/app/globals.css` - Futuristic theme

## 💡 Pro Tips

1. Use `npm run build` to check for errors before deploying
2. Check `.env.local` is NOT committed: `git status`
3. Demo data loads automatically on the feed page
4. All API functions ready in `/src/lib/api/`
5. Hover over buttons to see animations!

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
rm -rf .next
npm run build
```

**Environment variables not loading?**
- Restart dev server
- Make sure `.env.local` is in root directory
- Check variable names match exactly

## 📞 Ready to Deploy?

**To Vercel:**
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard, then deploy!

---

**You're all set! 🎉**

Start the dev server with `npm run dev` and visit http://localhost:3000

Questions? Check SETUP.md or README.md for more info!
