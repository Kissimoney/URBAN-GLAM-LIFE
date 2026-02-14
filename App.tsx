
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import ChatWidget from './components/ChatWidget';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Experiences from './components/Experiences';
import Blogs from './components/Blogs';
import Testimonials from './components/Testimonials';
import Press from './components/Press';
import Newsletter from './components/Newsletter';
import VIPAccess from './components/VIPAccess';
import ContactForm from './components/ContactForm';
import EliteExperience from './components/EliteExperience';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
import BlogPost from './pages/BlogPost';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CollectionPage from './pages/CollectionPage';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { useSmoothScroll, useScrollToTop, useScrollProgress, useScrollVisibility } from './hooks/useScroll';

const HomePage: React.FC = () => {
  useSmoothScroll();
  useScrollProgress();
  useScrollVisibility();

  return (
    <>
      <SEO
        title="Luxury Lifestyle & Exclusive Events"
        description="Experience the pinnacle of high-fashion, elite travel, and curated events with Urban Glam Life."
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Experiences />
        <EliteExperience />
        <Blogs />
        <Testimonials />
        <Press />
        <Newsletter />
        <VIPAccess />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

const BlogPostPage: React.FC = () => {
  useScrollToTop();
  // SEO is handled dynamically inside BlogPost component
  return <BlogPost />;
};

const BlogListPage: React.FC = () => {
  useScrollToTop();
  return (
    <>
      <SEO title="Journal" description="Explore our collection of luxury lifestyle narratives." />
      <BlogPage />
    </>
  );
};

const EventsListPage: React.FC = () => {
  useScrollToTop();
  return (
    <>
      <SEO title="Events" description="Upcoming exclusive galas, fashion weeks, and VIP gatherings." />
      <EventsPage />
    </>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gold italic">Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/access" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-neutral-950 selection:bg-gold selection:text-black">
              <ScrollProgress />
              <CustomCursor />
              <BackToTop />
              <ChatWidget />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsListPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/access" element={<AuthPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
