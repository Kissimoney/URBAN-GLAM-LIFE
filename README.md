# Urban Glam Life 💎

A premium luxury lifestyle website showcasing high fashion, exclusive travel, and elite nightlife experiences.

![Urban Glam Life](https://i.imgur.com/5MGlsgg.jpg)

## ✨ Features

### 🎬 Dynamic Hero Section
- Video/Image background toggle
- Play/pause controls
- Parallax scrolling effect
- Premium typography with gold accents

### 📝 Blog System
- **Blog Search & Filtering** - Search by keyword, filter by category
- **Social Sharing** - Share on Twitter, Facebook, LinkedIn, Email
- **Reading Progress Bar** - Track article reading progress
- Dynamic routing for individual posts
- Full article pages with metadata
- Author information and tags
- Related posts recommendations
- Dedicated blog listing page

### 🖼️ Interactive Gallery
- Lightbox with keyboard navigation
- Smooth transitions and animations
- Hover effects with glint sweep
- Mobile-friendly swipe gestures

### 💬 Testimonials Carousel
- Client testimonials with ratings
- Image gallery integration
- Arrow and dot navigation
- Brand partnership logos

### 📰 Press & Media
- Featured press coverage
- Industry awards showcase
- Category badges (Feature, Interview, Award)
- Press kit download

### 📧 Newsletter Subscription
- Email validation
- Customizable content preferences
- Success/error feedback
- Privacy notice

### ⭐ VIP Access
- Exclusive membership signup
- Email integration via EmailJS
- Premium form design

### 🎨 Advanced Features
- **Blog Search** - Keyword and category filtering
- **Social Share** - Multi-platform sharing
- **Reading Progress** - Visual article progress
- **Loading Skeletons** - Smooth loading states
- **Lazy Loading Images** - Performance optimization
- **Scroll Reveal Animations** - 8 preset effects
- **Custom 404 Page** - Helpful error handling
- **Supabase Integration** - Secure lead collection for newsletters and VIP access.
- **Scroll Progress Bar** - Visual reading indicator
- **Back-to-Top Button** - Quick navigation
- **Smooth Scrolling** - Enhanced UX

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Supabase project (for lead collection)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd urban-glam-life

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173/` to view the site.

---

## 📁 Project Structure

```
urban-glam-life/
├── components/          # React components
│   ├── About.tsx
│   ├── BackToTop.tsx
│   ├── Blogs.tsx
│   ├── ContactForm.tsx
│   ├── CustomCursor.tsx
│   ├── Experiences.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LazyImage.tsx
│   ├── Newsletter.tsx
│   ├── Press.tsx
│   ├── ScrollProgress.tsx
│   ├── Skeleton.tsx
│   ├── Testimonials.tsx
│   └── VIPAccess.tsx
├── pages/               # Page components
│   ├── BlogPost.tsx
│   └── NotFound.tsx
├── hooks/               # Custom React hooks
│   ├── useScroll.ts
│   └── useScrollReveal.tsx
├── data/                # Data files
│   └── blogData.ts
├── public/              # Static assets
├── index.css            # Global styles
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── vite.config.ts       # Vite configuration
```

---

## 🎨 Customization

### Change Brand Color

**File**: `index.css`
```css
--gold: #d4af37;  /* Change to your brand color */
```

### Update Hero Video

**File**: `components/Hero.tsx` (Line 42)
```typescript
<source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
```

### Add Blog Posts

**File**: `data/blogData.ts`
```typescript
{
  id: 4,
  slug: 'your-post-slug',
  title: 'Your Post Title',
  category: 'Fashion',
  // ... add content
}
```

### Update Gallery Images

**File**: `components/Gallery.tsx` (Line 8)
```typescript
{ url: 'YOUR_IMAGE.jpg', title: 'Title', category: 'Fashion' }
```

See `QUICK_REFERENCE.md` for more customization options.

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# Gemini AI (optional)
VITE_GEMINI_API_KEY=your_gemini_key

# EmailJS (required for forms)
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_VIP_TEMPLATE_ID=your_vip_template_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
```

See `EMAILJS_SETUP.md` for detailed setup instructions.

---

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly to different screen sizes.

---

## 🎯 Performance

### Optimization Features
- ✅ Lazy loading images
- ✅ Code splitting with React Router
- ✅ Optimized animations (GPU-accelerated)
- ✅ Skeleton loaders prevent layout shift
- ✅ On-demand video loading
- ✅ Efficient Intersection Observers

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## 🧪 Testing

See `TESTING_GUIDE.md` for comprehensive testing checklist.

### Quick Test
```bash
# Start dev server
npm run dev

# Open browser
http://localhost:5173/

# Test features:
- Toggle video/image in hero
- Click gallery images
- Navigate to blog posts
- Submit forms (requires EmailJS)
- Visit /invalid-url for 404 page
```

---

## 🚢 Deployment

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Deploy to GitHub Pages

See deployment documentation for specific instructions.

---

## 📚 Documentation

- **`TESTING_GUIDE.md`** - Complete testing checklist
- **`QUICK_REFERENCE.md`** - Quick customization guide
- **`FEATURE_MAP.md`** - Visual site structure
- **`EMAILJS_SETUP.md`** - Email integration setup
- **`PHASE_2_COMPLETE.md`** - Blog features documentation
- **`PHASE_3_COMPLETE.md`** - Press & Newsletter features
- **`PHASE_4_COMPLETE.md`** - Advanced features

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: EmailJS
- **Animations**: CSS Transitions & Transforms
- **Image Hosting**: Imgur (recommended)

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "@emailjs/browser": "^4.4.1",
  "lucide-react": "^0.468.0"
}
```

---

## 🎨 Design Philosophy

### Premium Aesthetics
- Sophisticated color palette (black, gold, white)
- Elegant serif typography for headings
- Smooth animations and transitions
- High-quality imagery
- Attention to micro-interactions

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Immediate feedback on interactions
- Accessible design (WCAG compliant)
- Mobile-first approach

### Performance
- Fast loading times
- Optimized images
- Efficient animations
- Minimal layout shift
- Progressive enhancement

---

## 🔮 Future Enhancements

### Potential Features
- [ ] Blog search and filtering
- [ ] User authentication
- [ ] Comments system
- [ ] Social media integration
- [ ] E-commerce functionality
- [ ] Analytics dashboard
- [ ] Dark/Light mode toggle
- [ ] Multi-language support

---

## 🐛 Troubleshooting

### Video Not Playing
- Ensure video URL is accessible
- Check format is MP4
- Verify autoplay, muted attributes

### Forms Not Submitting
- Setup EmailJS (see `EMAILJS_SETUP.md`)
- Check environment variables
- Verify template IDs

### Images Not Loading
- Use direct image URLs
- Check CORS settings
- Verify Imgur links

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Urban Glam Life**
- Website: [Your Website]
- Instagram: [@urbanglamlife]
- Email: contact@urbanglamlife.com

---

## 🙏 Acknowledgments

- Images from Imgur
- Icons from Lucide React
- Sample video from Mixkit
- Fonts from Google Fonts
- EmailJS for form handling

---

## 📞 Support

For questions or issues:
1. Check documentation files
2. Review `TESTING_GUIDE.md`
3. Check browser console for errors
4. Verify environment variables
5. Contact support

---

## 🎉 Getting Started

1. **Install dependencies**: `npm install`
2. **Setup EmailJS**: See `EMAILJS_SETUP.md`
3. **Start dev server**: `npm run dev`
4. **Test features**: See `TESTING_GUIDE.md`
5. **Customize content**: See `QUICK_REFERENCE.md`
6. **Deploy**: `npm run build`

---

**Built with ❤️ for luxury lifestyle enthusiasts**

Visit the site: `http://localhost:5173/`

---

## 📊 Project Stats

- **Components**: 25+
- **Pages**: 3 (Home, Blog Posts, 404)
- **Routes**: 3 + catch-all
- **Hooks**: 6 custom hooks
- **Animations**: 8 scroll reveal presets
- **Forms**: 3 (VIP, Newsletter, Contact)
- **Blog Posts**: 3 (expandable)
- **Testimonials**: 3 (carousel)
- **Press Articles**: 4 featured

---

**Ready to launch your luxury lifestyle brand? Let's get started! 🚀**
