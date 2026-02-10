# Quick Reference Card 📋

## 🎯 Most Common Customizations

### 1. Change Hero Video
**File**: `components/Hero.tsx` (Line 42)
```typescript
<source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
```

### 2. Update Gallery Images
**File**: `components/Gallery.tsx` (Line 8)
```typescript
{ url: 'YOUR_IMAGE.jpg', title: 'Title', category: 'Fashion' }
```

### 3. Add Blog Post
**File**: `data/blogData.ts` (Add to array)
```typescript
{
  id: 4,
  slug: 'your-post-slug',
  title: 'Your Title',
  category: 'Fashion',
  // ... rest of fields
}
```

### 4. Update Testimonials
**File**: `components/Testimonials.tsx` (Line 16)
```typescript
{
  name: 'Name',
  role: 'Role',
  company: 'Company',
  quote: 'Quote...',
  image: 'IMAGE_URL.jpg'
}
```

### 5. Change Brand Color
**File**: `index.css` (Line 1)
```css
--gold: #YOUR_COLOR;
```

---

## 🔗 Important Files

| What to Change | File Location |
|----------------|---------------|
| Hero Video | `components/Hero.tsx` |
| Gallery Images | `components/Gallery.tsx` |
| Blog Posts | `data/blogData.ts` |
| Testimonials | `components/Testimonials.tsx` |
| Press Articles | `components/Press.tsx` |
| Newsletter Prefs | `components/Newsletter.tsx` |
| Colors | `index.css` |
| 404 Message | `pages/NotFound.tsx` |
| Contact Info | `components/Footer.tsx` |
| EmailJS Config | `.env.local` |

---

## 🎨 Color Palette

Current colors:
- **Gold**: `#d4af37`
- **Black**: `#000000`
- **Neutral 950**: `#0a0a0a`
- **Neutral 900**: `#171717`
- **White**: `#ffffff`

Luxury alternatives:
- Rose Gold: `#b76e79`
- Platinum: `#e5e4e2`
- Champagne: `#f7e7ce`

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
< 768px

/* Tablet */
768px - 1024px

/* Desktop */
> 1024px
```

---

## 🚀 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

---

## 🔧 Environment Variables

**File**: `.env.local`

```env
VITE_GEMINI_API_KEY=your_key_here
VITE_EMAILJS_PUBLIC_KEY=your_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_VIP_TEMPLATE_ID=your_template_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_template_id
```

---

## 📊 Component Hierarchy

```
App
├── HomePage
│   ├── Header
│   ├── Hero (with video option)
│   ├── About
│   ├── Gallery (with lightbox)
│   ├── Experiences
│   ├── Blogs (links to posts)
│   ├── Testimonials (carousel)
│   ├── Press
│   ├── Newsletter
│   ├── VIPAccess
│   ├── ContactForm
│   └── Footer
├── BlogPostPage
│   └── BlogPost (dynamic)
└── NotFound (404)
```

---

## 🎬 Animation Presets

Use with `<ScrollReveal>`:
- `fadeIn`
- `slideUp`
- `slideDown`
- `slideLeft`
- `slideRight`
- `scaleUp`
- `scaleDown`
- `rotateIn`

---

## 📝 Content Limits

Recommended:
- Blog title: 60 characters
- Blog excerpt: 150 characters
- Testimonial quote: 200 characters
- Press article title: 80 characters
- Gallery images: 6-12 items

---

## 🐛 Quick Fixes

**Video not playing?**
→ Check format is MP4, add muted attribute

**Forms not working?**
→ Setup EmailJS (see EMAILJS_SETUP.md)

**Images not loading?**
→ Use direct Imgur URLs

**Scroll not smooth?**
→ Check anchor IDs match links

---

## 📞 Support Files

- `TESTING_GUIDE.md` - Full testing checklist
- `EMAILJS_SETUP.md` - Email setup guide
- `PHASE_2_COMPLETE.md` - Blog features
- `PHASE_3_COMPLETE.md` - Press & Newsletter
- `PHASE_4_COMPLETE.md` - Advanced features

---

**Quick Start**: Open `TESTING_GUIDE.md` for detailed instructions!
