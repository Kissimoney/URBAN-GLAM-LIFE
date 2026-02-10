# Feature Update: Wishlist & Enhancements

## 1. Wishlist System
- **Functionality**: Logged-in users can now "favorite" items in the Collection.
- **Persistence**: Data is stored in Supabase `wishlist_items` table.
- **UI**: 
  - Heart icon on product cards (Collection Page).
  - "My Wishlist" section in the VIP Dashboard.

## 2. Dashboard Improvements
- **Integration**: Displays both Event RSVPs and Wishlist items side-by-side.
- **Actions**: Users can remove items from their wishlist directly from the dashboard.

## 3. SEO Optimization
- **Implementation**: Integrated `react-helmet-async` for managing document head tags.
- **Coverage**: 
  - Homepage: "Luxury Lifestyle & Exclusive Events"
  - Blog Posts: Dynamic titles and excerpts.
  - Collection/Events: Section-specific metadata.

## 4. Performance
- **Lazy Loading**: Added `loading="lazy"` to image-heavy components (Collection, Dashboard) to improve initial load time.

## 5. Contact Form
- **Data Saving**: Inquiries are now saved to the `messages` table in Supabase for admin review.
