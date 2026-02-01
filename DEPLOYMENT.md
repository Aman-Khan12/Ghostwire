# 🚀 Ghostwire Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] Database tables created in Supabase
- [ ] `.env.local` is NOT committed to git (check `.gitignore`)
- [ ] Build test successful: `npm run build`
- [ ] No console errors in development

## Deploy to Vercel (Recommended)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Authenticate with Vercel

```bash
vercel login
```

### 3. Deploy

```bash
# First deployment
vercel

# Subsequent deployments
vercel --prod
```

### 4. Add Environment Variables

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

Add these production variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://db.jojvzzlkanbvofbyyjgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your anon key]
SUPABASE_SERVICE_ROLE_KEY=[Your service role key]
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jojvzzlkanbvofbyyjgm.supabase.co:5432/postgres
```

## Deploy to Other Platforms

### Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables in Site settings

### AWS Amplify

1. Push code to GitHub
2. Go to [AWS Amplify](https://aws.amazon.com/amplify/)
3. Connect repository
4. Configure build settings
5. Deploy

### Self-Hosted (Docker)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t ghostwire .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... ghostwire
```

## Production Environment Variables

**NEVER expose sensitive keys in client-side code!**

✅ Safe to expose (Public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

❌ NEVER expose (Private):
- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Production Optimization

### 1. Enable Caching

The Next.js build already includes:
- Static generation for pages
- Automatic image optimization
- CSS minification

### 2. Configure Supabase

- Enable Row Level Security (RLS) policies
- Set up backups
- Configure firewall rules
- Enable rate limiting

### 3. Monitor Performance

Use Vercel Analytics:
- Go to Vercel dashboard
- Click "Analytics"
- Monitor Core Web Vitals

### 4. Set Up Logging

Add error tracking with:
- Sentry
- LogRocket
- Datadog

## Security Checklist

- [ ] All secrets in environment variables
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] SQL injection prevention (Supabase handles)
- [ ] XSS protection enabled (Next.js default)

## Post-Deployment

### 1. Test Production Site

```bash
# Verify all pages load
# Test interactions (wire, comment, support, share)
# Test image uploads
# Test location tagging
# Test community creation
```

### 2. Monitor Errors

Check:
- Vercel deployment logs
- Supabase logs
- Browser console for errors
- Network requests

### 3. Set Up Redirects

In `next.config.ts`:

```typescript
export default {
  redirects: async () => [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,
    },
  ],
}
```

### 4. Configure Analytics

Add Google Analytics or equivalent:

```typescript
// In pages/_document.tsx or layout.tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');`,
  }}
/>
```

## Rollback Plan

If something goes wrong:

**On Vercel:**
1. Go to Deployments
2. Click on previous stable version
3. Click "Redeploy"

**On self-hosted:**
```bash
# Keep previous version backup
git rollback <commit-hash>
npm run build && npm start
```

## Database Backups

### Supabase Automatic Backups

- Enabled by default
- 7-day retention free tier
- 30-day retention pro tier

### Manual Backup

```bash
# Export database
pg_dump postgresql://postgres:password@host/postgres > backup.sql

# Restore database
psql postgresql://postgres:password@host/postgres < backup.sql
```

## Scaling Tips

1. **For more traffic:**
   - Enable Vercel Pro for better performance
   - Use Supabase Pro for better database performance
   - Add Redis cache layer

2. **For more storage:**
   - Use Supabase Storage for images
   - Configure CDN for static assets

3. **For real-time features:**
   - Use Supabase Realtime
   - Configure WebSocket limits

## Troubleshooting Deployment

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Environment Variables Not Loading

- Verify variable names match exactly
- Restart the deployment
- Check variable values don't have quotes
- Ensure no typos in key names

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check firewall allows your IP
- Test connection locally first
- Check Supabase project status

### Images Not Loading

- Verify image URLs are correct
- Check CORS headers
- Enable Supabase Storage public access
- Use Image component from Next.js

## Performance Tips

1. **Enable compression**
   ```typescript
   // next.config.ts
   compress: true,
   ```

2. **Optimize images**
   - Use Next.js Image component
   - Enable AVIF format
   - Set appropriate sizes

3. **Code splitting**
   - Dynamic imports for heavy components
   - Lazy load modals and overlays

4. **Database optimization**
   - Add indexes (already in schema)
   - Use materialized views for complex queries
   - Cache frequently accessed data

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

---

**Happy deploying! 🚀**
