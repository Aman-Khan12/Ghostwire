# Ghostwire - Setup Guide

## Database Setup Instructions

To set up the Supabase database for Ghostwire, follow these steps:

### 1. Update Environment Variables

Edit `.env.local` and replace the placeholder values:

```
NEXT_PUBLIC_SUPABASE_URL=https://db.jojvzzlkanbvofbyyjgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres
```

**To get your keys:**
1. Go to https://app.supabase.com/
2. Select your project
3. Go to Settings → API to get NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY

### 2. Create Database Tables

You have two options:

#### Option A: Using Supabase SQL Editor (Recommended for UI)
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Click "New query"
4. Copy the contents of `migrations/001_create_tables.sql`
5. Paste into the SQL editor and click "Run"

#### Option B: Using psql CLI

```bash
# Connect to your Supabase database
psql postgresql://postgres:[YOUR-PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres

# Then run the SQL commands from migrations/001_create_tables.sql
```

### 3. Verify Tables Were Created

Run in Supabase SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- users
- posts
- communities
- community_members
- post_interactions
- comments

## Important Security Notes

⚠️ **DO NOT commit `.env.local` file - it contains sensitive credentials**

The `.gitignore` file is configured to prevent this automatically.

## Running the Application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

- **Wire (Like)**: Quick reaction to posts
- **Comments**: Detailed responses to posts
- **Support (Repost)**: Share posts with your network
- **Share**: Direct sharing functionality
- **Post Creation**: Upload images, add captions, and tag location
- **Communities**: Create and manage groups
- **Masculine Futuristic Design**: Dark theme with cyan/tech accents (no purple)

## Tech Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- Supabase for backend
- Lucide React for SVG icons
