# Customization Examples 🎨

Real code examples for common customizations. Copy and paste these into your files!

---

## 🎬 Hero Section Customizations

### Replace Video with Your Own

**File**: `components/Hero.tsx` (Line 42)

```typescript
// Current sample video
<source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-dark-studio-39875-large.mp4" type="video/mp4" />

// Replace with your video
<source src="https://your-cdn.com/your-video.mp4" type="video/mp4" />

// Or use multiple sources for fallback
<source src="https://your-cdn.com/video.webm" type="video/webm" />
<source src="https://your-cdn.com/video.mp4" type="video/mp4" />
```

### Change Hero Background Image

**File**: `components/Hero.tsx` (Line 23)

```typescript
// Current image
backgroundImage: `url('https://i.imgur.com/5MGlsgg.jpg')`,

// Replace with your image
backgroundImage: `url('https://your-image-url.jpg')`,
```

### Modify Hero Text

**File**: `components/Hero.tsx` (Lines 36-48)

```typescript
// Current text
<span className="...">High Fashion & Nightlife</span>

<h1 className="...">
  Confidence <br />
  <span className="...">is the New</span> <br />
  Glamour
</h1>

<p className="...">
  Where urban edge meets elite couture...
</p>

// Customize to your brand
<span className="...">Your Tagline Here</span>

<h1 className="...">
  Your <br />
  <span className="...">Brand</span> <br />
  Message
</h1>

<p className="...">
  Your brand description goes here...
</p>
```

---

## 🖼️ Gallery Customizations

### Add More Images

**File**: `components/Gallery.tsx` (Line 8)

```typescript
const images: GalleryImage[] = useMemo(() => [
  // Existing images...
  { 
    url: 'https://i.imgur.com/fBXEVvt.jpg', 
    title: 'Midnight Elegance', 
    category: 'Fashion' 
  },
  
  // Add your new images here
  { 
    url: 'https://your-image-url-1.jpg', 
    title: 'Your Image Title 1', 
    category: 'Fashion' 
  },
  { 
    url: 'https://your-image-url-2.jpg', 
    title: 'Your Image Title 2', 
    category: 'Travel' 
  },
  { 
    url: 'https://your-image-url-3.jpg', 
    title: 'Your Image Title 3', 
    category: 'Lifestyle' 
  },
], []);
```

### Change Gallery Grid Layout

**File**: `components/Gallery.tsx` (Line 45)

```typescript
// Current: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Change to 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// Change to 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## 📝 Blog Customizations

### Add a New Blog Post

**File**: `data/blogData.ts` (Add to array)

```typescript
export const blogPosts: BlogPost[] = [
  // Existing posts...
  
  // Add your new post
  {
    id: 4, // Increment ID
    slug: 'your-blog-post-slug', // URL-friendly slug
    title: 'Your Blog Post Title',
    category: 'Fashion', // or 'Travel', 'Entertainment'
    date: 'APRIL 15, 2024',
    readTime: '5 MIN READ',
    image: 'https://your-image-url.jpg',
    excerpt: 'A brief 2-3 sentence summary of your blog post that will appear on the card.',
    content: {
      intro: 'Your opening paragraph goes here. Make it engaging and set the tone for the article.',
      sections: [
        {
          heading: 'First Section Heading',
          content: 'Content for the first section. You can include multiple paragraphs, tips, and insights.'
        },
        {
          heading: 'Second Section Heading',
          content: 'Content for the second section. Keep it informative and engaging.'
        },
        {
          heading: 'Third Section Heading',
          content: 'Content for the third section. Add as many sections as needed.'
        }
      ],
      conclusion: 'Your closing paragraph. Summarize key points and provide a call-to-action or final thought.'
    },
    author: {
      name: 'Your Name',
      role: 'Your Role',
      bio: 'A brief bio about the author.',
      image: 'https://your-author-image.jpg'
    },
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
  }
];
```

### Change Blog Card Display Count

**File**: `components/Blogs.tsx` (Line 28)

```typescript
// Current: Shows 3 posts
const displayPosts = blogPosts.slice(0, 3);

// Show 6 posts
const displayPosts = blogPosts.slice(0, 6);

// Show all posts
const displayPosts = blogPosts;
```

---

## 💬 Testimonial Customizations

### Add New Testimonials

**File**: `components/Testimonials.tsx` (Line 16)

```typescript
const testimonials: Testimonial[] = [
  // Existing testimonials...
  
  // Add your new testimonial
  {
    id: 4, // Increment ID
    name: 'Client Full Name',
    role: 'CEO',
    company: 'Company Name',
    image: 'https://your-client-image.jpg',
    quote: 'Your client testimonial goes here. Keep it authentic and specific to build trust.',
    rating: 5, // 1-5 stars
    gallery: [
      'https://gallery-image-1.jpg',
      'https://gallery-image-2.jpg',
      'https://gallery-image-3.jpg'
    ]
  }
];
```

### Change Testimonial Auto-Advance Speed

**File**: `components/Testimonials.tsx` (Line 35)

```typescript
// Current: 5 seconds
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, 5000); // Change this number (in milliseconds)
  
  return () => clearInterval(timer);
}, []);

// Change to 8 seconds
}, 8000);

// Disable auto-advance (remove the useEffect entirely)
```

---

## 📰 Press Section Customizations

### Add Press Articles

**File**: `components/Press.tsx` (Line 14)

```typescript
const pressItems: PressItem[] = [
  // Existing articles...
  
  // Add your new article
  {
    id: 5, // Increment ID
    publication: 'Publication Name',
    logo: 'PUBLICATION', // Short name for logo
    title: 'Article Title Goes Here',
    date: 'Month Year',
    excerpt: 'Brief description of the article or feature.',
    url: 'https://actual-article-url.com', // Real link to article
    category: 'Feature' // or 'Interview', 'Award', 'Mention'
  }
];
```

### Add More Awards

**File**: `components/Press.tsx` (Line 100)

```typescript
const awards = [
  // Existing awards...
  
  // Add your new award
  {
    id: 4,
    title: 'Award Name',
    organization: 'Awarding Organization',
    year: '2024',
    category: 'Category Name'
  }
];
```

---

## 📧 Newsletter Customizations

### Add New Preference Options

**File**: `components/Newsletter.tsx` (Line 14)

```typescript
// Add to state
const [preferences, setPreferences] = useState({
  fashion: true,
  travel: true,
  lifestyle: true,
  beauty: true,     // New preference
  wellness: true,   // New preference
});

// Then add the UI card (around line 110)
<div
  onClick={() => togglePreference('beauty')}
  className={`cursor-pointer p-8 border-2 transition-all duration-500 ${
    preferences.beauty
      ? 'border-gold bg-gold/5'
      : 'border-white/10 hover:border-gold/50'
  }`}
>
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-xl font-bold text-white">Beauty</h4>
    {preferences.beauty && (
      <Check className="text-gold" size={24} />
    )}
  </div>
  <p className="text-neutral-400 text-sm">
    Skincare, makeup, and beauty trends
  </p>
</div>
```

### Change Newsletter Success Message

**File**: `components/Newsletter.tsx` (Line 70)

```typescript
// Current message
setSubmitStatus({
  type: 'success',
  message: 'Welcome to The Weekly Edit! Check your inbox.'
});

// Customize message
setSubmitStatus({
  type: 'success',
  message: 'Thank you for subscribing! Your first newsletter arrives Friday.'
});
```

---

## 🎨 Color Scheme Customizations

### Change Primary Brand Color

**File**: `index.css` (Line 1)

```css
/* Current gold */
--gold: #d4af37;

/* Rose Gold */
--gold: #b76e79;

/* Platinum */
--gold: #e5e4e2;

/* Champagne */
--gold: #f7e7ce;

/* Bronze */
--gold: #cd7f32;

/* Emerald */
--gold: #50c878;

/* Sapphire */
--gold: #0f52ba;

/* Custom color */
--gold: #YOUR_HEX_COLOR;
```

### Add Custom Color Variables

**File**: `index.css` (Add after existing variables)

```css
:root {
  --gold: #d4af37;
  
  /* Add your custom colors */
  --accent-1: #ff6b6b;
  --accent-2: #4ecdc4;
  --accent-3: #ffe66d;
}

/* Use in components */
.your-element {
  color: var(--accent-1);
  background: var(--accent-2);
  border-color: var(--accent-3);
}
```

---

## 🔧 Scroll Behavior Customizations

### Change Back-to-Top Threshold

**File**: `App.tsx` (Line 25)

```typescript
// Current: Appears after 300px
useScrollVisibility();

// Appears after 500px
useScrollVisibility(500);

// Appears after 100px
useScrollVisibility(100);
```

### Adjust Scroll Reveal Timing

**File**: `hooks/useScrollReveal.tsx` (Line 60)

```typescript
// Current: 1000ms transition
visible: 'opacity-100 translate-y-0 transition-all duration-1000 ease-out',

// Faster: 500ms
visible: 'opacity-100 translate-y-0 transition-all duration-500 ease-out',

// Slower: 1500ms
visible: 'opacity-100 translate-y-0 transition-all duration-1500 ease-out',
```

---

## 📱 Mobile Customizations

### Adjust Mobile Breakpoints

**File**: `tailwind.config.js` (if you create one)

```javascript
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',  // Tablet
      'lg': '1024px', // Desktop
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

### Mobile-Specific Styling

```typescript
// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
  Mobile only content
</div>

// Different sizes
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Responsive heading
</h1>
```

---

## 🎯 404 Page Customizations

### Change 404 Message

**File**: `pages/NotFound.tsx` (Line 28)

```typescript
// Current message
<h2 className="...">Page Not Found</h2>
<p className="...">
  The page you're looking for seems to have vanished into the night...
</p>

// Customize
<h2 className="...">Oops! Lost in Style</h2>
<p className="...">
  This page is as exclusive as our VIP events - it doesn't exist yet!
</p>
```

### Add Custom Quick Links

**File**: `pages/NotFound.tsx` (Line 60)

```typescript
// Add a new quick link card
<Link
  to="/#your-section"
  className="group p-6 bg-neutral-900/50 border border-white/10 hover:border-gold/30 transition-all duration-500"
>
  <div className="text-gold text-2xl font-serif mb-2 group-hover:scale-110 transition-transform">
    05
  </div>
  <p className="text-white text-sm uppercase tracking-wider font-bold">
    Your Section
  </p>
</Link>
```

---

## 🎬 Animation Customizations

### Add Scroll Reveal to Sections

**File**: `App.tsx` or any component

```typescript
import { ScrollReveal } from './hooks/useScrollReveal';

// Wrap any section
<ScrollReveal animation="slideUp" delay={0}>
  <About />
</ScrollReveal>

<ScrollReveal animation="fadeIn" delay={200}>
  <Gallery />
</ScrollReveal>

<ScrollReveal animation="scaleUp" delay={400}>
  <Blogs />
</ScrollReveal>
```

### Create Custom Animation

**File**: `hooks/useScrollReveal.tsx` (Add to revealAnimations object)

```typescript
export const revealAnimations = {
  // Existing animations...
  
  // Add custom animation
  bounceIn: {
    hidden: 'opacity-0 scale-50',
    visible: 'opacity-100 scale-100 transition-all duration-700 ease-out',
  },
  slideRotate: {
    hidden: 'opacity-0 translate-y-12 rotate-6',
    visible: 'opacity-100 translate-y-0 rotate-0 transition-all duration-1000 ease-out',
  },
};
```

---

## 🖼️ Image Optimization

### Use Lazy Loading

Replace regular `<img>` tags:

```typescript
import LazyImage from './components/LazyImage';

// Before
<img 
  src="https://your-image.jpg" 
  alt="Description"
  className="w-full h-full object-cover"
/>

// After
<LazyImage
  src="https://your-image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
  skeletonHeight="500px"
  skeletonVariant="card"
/>
```

---

## 📊 SEO Customizations

### Update Page Title

**File**: `index.html`

```html
<!-- Current -->
<title>Urban Glam Life</title>

<!-- Customize -->
<title>Your Brand Name | Luxury Lifestyle</title>
```

### Add Meta Description

**File**: `index.html`

```html
<head>
  <!-- Add this -->
  <meta name="description" content="Your compelling site description for search engines. Keep it under 160 characters.">
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Your Brand Name">
  <meta property="og:description" content="Your description">
  <meta property="og:image" content="https://your-image.jpg">
  <meta property="og:url" content="https://yoursite.com">
</head>
```

---

## 🔐 Environment Variables

### Add New Environment Variable

**File**: `.env.local`

```env
# Existing variables
VITE_EMAILJS_PUBLIC_KEY=your_key

# Add new variable
VITE_YOUR_NEW_VAR=your_value
```

**File**: `src/vite-env.d.ts`

```typescript
interface ImportMetaEnv {
  // Existing
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  
  // Add new
  readonly VITE_YOUR_NEW_VAR: string;
}
```

**Usage in code**:

```typescript
const yourValue = import.meta.env.VITE_YOUR_NEW_VAR;
```

---

## 🎨 Typography Customizations

### Change Fonts

**File**: `index.css`

```css
/* Current fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;700;900&display=swap');

/* Add new fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&display=swap');

/* Update font families */
body {
  font-family: 'Montserrat', sans-serif; /* Changed from Inter */
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', serif; /* Changed from Playfair */
}
```

---

**Copy these examples directly into your files to customize your site!** 🎨

For more customization options, see:
- `QUICK_REFERENCE.md` - Quick reference guide
- `TESTING_GUIDE.md` - Testing instructions
- Component files - Direct code modifications
