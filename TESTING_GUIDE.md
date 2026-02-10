# Testing & Customization Guide 🧪

## Quick Start Testing

Your Urban Glam Life website is running at: **http://localhost:5173/**

This guide will walk you through testing all features and show you how to customize them.

---

## 🎯 Feature Testing Checklist

### Phase 1: Core Features

#### ✅ **Hero Section**
- [ ] Visit homepage
- [ ] Check hero image loads with parallax effect
- [ ] Click **"Video"** button in top-right corner
- [ ] Verify video plays automatically
- [ ] Click **Play/Pause** button to control video
- [ ] Toggle back to **"Image"** mode
- [ ] Scroll down to test parallax effect

**Customization**: Replace video in `components/Hero.tsx` line 42

#### ✅ **Navigation & Scrolling**
- [ ] Watch **scroll progress bar** at top (gold gradient)
- [ ] Scroll down past 300px
- [ ] See **back-to-top button** appear (bottom-right)
- [ ] Click back-to-top button
- [ ] Test smooth scroll to top
- [ ] Click any navigation link in header
- [ ] Verify smooth scroll to section

**Customization**: Adjust threshold in `App.tsx` line 25

#### ✅ **About Section**
- [ ] Scroll to About section
- [ ] Check circular image frame
- [ ] Verify statistics display
- [ ] Test hover effects on stats

#### ✅ **Gallery**
- [ ] View gallery grid (6 images)
- [ ] Hover over images for effects
- [ ] Click any image to open lightbox
- [ ] Navigate with arrow keys or buttons
- [ ] Press ESC or click X to close
- [ ] Test on mobile (swipe gestures)

**Customization**: Update images in `components/Gallery.tsx` line 8

---

### Phase 2: Blog & Testimonials

#### ✅ **Blog Section**
- [ ] Scroll to "Lifestyle Narratives"
- [ ] See 3 blog cards
- [ ] Hover over cards for animations
- [ ] Click **"Monochrome Magic"** blog card
- [ ] Verify navigation to blog post page
- [ ] Read full article content
- [ ] Check author info and tags
- [ ] Scroll to bottom for related posts
- [ ] Click a related post
- [ ] Use **back button** to return home

**Test All Blog Posts**:
- [ ] `/blog/monochrome-magic-styling-for-the-night`
- [ ] `/blog/top-5-secret-lounges-manhattan`
- [ ] `/blog/flying-private-101-platinum-way`

**Customization**: Edit content in `data/blogData.ts`

#### ✅ **Testimonials Carousel**
- [ ] Scroll to "Trusted Partnerships"
- [ ] See first testimonial (Isabella Chen)
- [ ] Click **right arrow** to next testimonial
- [ ] Click **left arrow** to previous
- [ ] Click **dot indicators** to jump to specific testimonial
- [ ] Verify smooth transitions
- [ ] Check 5-star ratings display
- [ ] View brand logos at bottom

**Customization**: Update testimonials in `components/Testimonials.tsx` line 16

---

### Phase 3: Press & Newsletter

#### ✅ **Press & Media Section**
- [ ] Scroll to "As Seen In"
- [ ] View 4 press articles
- [ ] Hover over article cards
- [ ] Check category badges (Feature, Interview, etc.)
- [ ] See 3 awards below
- [ ] Hover over award cards
- [ ] Click "Download Press Kit" button

**Customization**: Update press items in `components/Press.tsx` line 14

#### ✅ **Newsletter Subscription**
- [ ] Scroll to "The Weekly Edit"
- [ ] Enter email address
- [ ] Click **Fashion** preference (should highlight gold)
- [ ] Click **Travel** preference
- [ ] Click **Lifestyle** preference
- [ ] Unselect all preferences
- [ ] Try to submit (should show error)
- [ ] Select at least one preference
- [ ] Enter invalid email (test@)
- [ ] Verify validation error
- [ ] Enter valid email
- [ ] Click "Subscribe Now"
- [ ] Check for success/error message

**Note**: Requires EmailJS setup (see `EMAILJS_SETUP.md`)

**Customization**: Add preferences in `components/Newsletter.tsx` line 14

---

### Phase 4: Advanced Features

#### ✅ **404 Page**
- [ ] Visit invalid URL: `http://localhost:5173/invalid-page`
- [ ] See custom 404 page
- [ ] Check giant "404" with gold gradient
- [ ] Click "Return Home" button
- [ ] Go back to `/invalid-page`
- [ ] Click "Browse Content" button
- [ ] Test quick navigation cards (About, Gallery, Blog, Contact)
- [ ] Click "Contact us" link

**Customization**: Edit messaging in `pages/NotFound.tsx`

#### ✅ **VIP Access Form**
- [ ] Scroll to VIP Access section
- [ ] Enter email address
- [ ] Click "Join the Elite"
- [ ] Verify form submission

**Note**: Requires EmailJS setup

#### ✅ **Contact Form**
- [ ] Scroll to Contact Form
- [ ] Fill in all fields (name, email, engagement type, message)
- [ ] Test validation (try submitting empty)
- [ ] Submit complete form
- [ ] Check for success message

**Note**: Requires EmailJS setup

---

## 🎨 Quick Customization Guide

### 1. **Replace Hero Video**

**File**: `components/Hero.tsx`  
**Line**: 42

```typescript
// Current
<source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-dark-studio-39875-large.mp4" type="video/mp4" />

// Replace with your video
<source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
```

**Recommended specs**:
- Format: MP4 (H.264)
- Resolution: 1920x1080 or higher
- Duration: 10-30 seconds (loops automatically)
- File size: Under 10MB for fast loading

---

### 2. **Update Gallery Images**

**File**: `components/Gallery.tsx`  
**Line**: 8

```typescript
const images: GalleryImage[] = useMemo(() => [
  { 
    url: 'YOUR_IMAGE_URL.jpg', 
    title: 'Your Title', 
    category: 'Fashion' 
  },
  // Add more images...
], []);
```

**Image requirements**:
- Format: JPG or PNG
- Recommended: Upload to Imgur for free hosting
- Aspect ratio: 4:5 (portrait) works best
- Resolution: At least 1200x1500px

---

### 3. **Customize Blog Content**

**File**: `data/blogData.ts`  
**Line**: 32

```typescript
{
  id: 4,
  slug: 'your-blog-post-slug',
  title: 'Your Blog Post Title',
  category: 'Fashion', // or 'Travel', 'Entertainment'
  date: 'APRIL 01, 2024',
  readTime: '5 MIN READ',
  image: 'YOUR_IMAGE_URL.jpg',
  excerpt: 'Your excerpt here...',
  content: {
    intro: 'Your introduction...',
    sections: [
      {
        heading: 'Section 1 Title',
        content: 'Section 1 content...'
      },
      // Add more sections...
    ],
    conclusion: 'Your conclusion...'
  },
  author: {
    name: 'Your Name',
    image: 'YOUR_AUTHOR_IMAGE.jpg'
  },
  tags: ['tag1', 'tag2', 'tag3']
}
```

---

### 4. **Update Testimonials**

**File**: `components/Testimonials.tsx`  
**Line**: 16

```typescript
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Client Name',
    role: 'Their Role',
    company: 'Company Name',
    image: 'CLIENT_IMAGE_URL.jpg',
    quote: 'Their testimonial quote here...',
    rating: 5,
  },
  // Add more testimonials...
];
```

---

### 5. **Customize Press Coverage**

**File**: `components/Press.tsx`  
**Line**: 14

```typescript
const pressItems: PressItem[] = [
  {
    id: 1,
    publication: 'Publication Name',
    logo: 'Publication Logo Text',
    title: 'Article Title',
    date: 'Month Year',
    excerpt: 'Article excerpt...',
    url: 'https://actual-article-url.com',
    category: 'Feature', // or 'Interview', 'Award', 'Mention'
  },
  // Add more press items...
];
```

---

### 6. **Update Newsletter Preferences**

**File**: `components/Newsletter.tsx`  
**Line**: 14

Add new preference:
```typescript
const [preferences, setPreferences] = useState({
  fashion: true,
  travel: true,
  lifestyle: true,
  newCategory: true, // Add new preference
});
```

Then add the UI card around line 110.

---

### 7. **Change Color Scheme**

**File**: `index.css`  
**Line**: 1

```css
/* Current gold color */
--gold: #d4af37;

/* Change to your brand color */
--gold: #YOUR_HEX_COLOR;
```

**Popular luxury alternatives**:
- Rose Gold: `#b76e79`
- Platinum: `#e5e4e2`
- Champagne: `#f7e7ce`
- Bronze: `#cd7f32`

---

### 8. **Adjust Scroll Thresholds**

**File**: `App.tsx`

```typescript
// Back-to-top button appears after scrolling
useScrollVisibility(300); // Change to 500, 200, etc.
```

**File**: `hooks/useScrollReveal.tsx`

```typescript
// When scroll animations trigger
threshold: 0.1, // 0.1 = 10% visible, 0.5 = 50% visible
```

---

### 9. **Customize 404 Page Message**

**File**: `pages/NotFound.tsx`  
**Line**: 28

```typescript
<h2 className="...">
  Your Custom 404 Title
</h2>
<p className="...">
  Your custom message here...
</p>
```

---

### 10. **Update Contact Info**

**File**: `components/Footer.tsx`

Update email, social links, and copyright info.

---

## 🔧 Advanced Customization

### Add Scroll Reveal to Sections

Wrap any section with the ScrollReveal component:

```typescript
import { ScrollReveal } from '../hooks/useScrollReveal';

<ScrollReveal animation="slideUp" delay={200}>
  <About />
</ScrollReveal>
```

**Available animations**:
- `fadeIn` - Simple fade
- `slideUp` - From bottom
- `slideDown` - From top
- `slideLeft` - From right
- `slideRight` - From left
- `scaleUp` - Zoom in
- `scaleDown` - Zoom out
- `rotateIn` - Rotate in

---

### Use Lazy Loading for Images

Replace `<img>` tags with `<LazyImage>`:

```typescript
import LazyImage from './components/LazyImage';

// Before
<img src="image.jpg" alt="Description" className="..." />

// After
<LazyImage 
  src="image.jpg" 
  alt="Description" 
  className="..."
  skeletonHeight="400px"
  skeletonVariant="card"
/>
```

---

### Add Loading Skeletons

Show skeleton while data loads:

```typescript
import { BlogCardSkeleton } from './components/Skeleton';

{isLoading ? (
  <BlogCardSkeleton />
) : (
  <BlogCard data={post} />
)}
```

---

## 📱 Mobile Testing

### Test on Different Devices

1. **Chrome DevTools**:
   - Press F12
   - Click device toolbar icon (Ctrl+Shift+M)
   - Test: iPhone 12, iPad, Galaxy S20

2. **Responsive Breakpoints**:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

3. **Test Features**:
   - [ ] Navigation menu
   - [ ] Gallery swipe
   - [ ] Form inputs
   - [ ] Video controls
   - [ ] Back-to-top button

---

## 🐛 Troubleshooting

### Video Not Playing
- Check video URL is accessible
- Ensure video format is MP4
- Verify autoplay, muted, playsInline attributes

### Forms Not Submitting
- Check EmailJS setup (see `EMAILJS_SETUP.md`)
- Verify environment variables in `.env.local`
- Check browser console for errors

### Images Not Loading
- Verify image URLs are accessible
- Check for CORS issues
- Ensure Imgur links are direct image URLs

### Smooth Scroll Not Working
- Check if anchor IDs match (e.g., `#about`, `#gallery`)
- Verify scroll hooks are initialized
- Clear browser cache

### 404 Page Not Showing
- Ensure you're visiting an invalid URL
- Check React Router configuration
- Verify catch-all route is last

---

## 📊 Performance Testing

### Check Page Speed

1. **Lighthouse** (Chrome DevTools):
   - F12 → Lighthouse tab
   - Generate report
   - Aim for 90+ scores

2. **Key Metrics**:
   - First Contentful Paint: < 1.8s
   - Largest Contentful Paint: < 2.5s
   - Cumulative Layout Shift: < 0.1
   - Time to Interactive: < 3.8s

### Optimization Tips

- Use lazy loading for images
- Enable video only when needed
- Minimize animation delays
- Compress images before uploading

---

## 🎯 Next Steps After Testing

Once you've tested everything:

1. **Setup EmailJS** (see `EMAILJS_SETUP.md`)
2. **Replace sample content** with your own
3. **Upload custom images** to Imgur
4. **Add your own video** to hero
5. **Customize colors** to match brand
6. **Test on real devices**
7. **Deploy to production**

---

## 📝 Content Checklist

Before going live, ensure you have:

- [ ] Custom hero video or image
- [ ] 6+ gallery images
- [ ] 3+ blog posts with full content
- [ ] 3+ testimonials
- [ ] 3+ press articles
- [ ] Your brand colors
- [ ] EmailJS configured
- [ ] Contact information updated
- [ ] Social media links added
- [ ] SEO meta tags customized

---

## 🚀 Deployment Ready?

When you're ready to deploy:

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Test production build**:
   ```bash
   npm run preview
   ```

3. **Deploy to**:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Your own hosting

---

## 💡 Pro Tips

1. **Test in Incognito** - Avoid cache issues
2. **Use Real Content** - Test with actual text/images
3. **Check Mobile First** - Most users are mobile
4. **Test Forms Thoroughly** - Ensure emails work
5. **Optimize Images** - Use TinyPNG or similar
6. **Test All Links** - Ensure no broken links
7. **Check Accessibility** - Use screen reader
8. **Monitor Performance** - Use Lighthouse regularly

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console (F12) for errors
2. Review the relevant component file
3. Check environment variables
4. Verify all dependencies installed
5. Clear cache and hard reload (Ctrl+Shift+R)

---

**Happy Testing! 🎉**

Your Urban Glam Life website is production-ready. Take your time testing each feature, customize it to match your brand, and make it truly yours!
