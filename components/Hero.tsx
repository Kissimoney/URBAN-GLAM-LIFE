import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [useVideo, setUseVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  const toggleVideo = () => {
    setUseVideo(!useVideo);
  };

  const togglePlayPause = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* VIDEO OR IMAGE BACKGROUND WITH PARALLAX */}
      {useVideo ? (
        <div className="absolute inset-0 w-full h-full">
          <video
            id="hero-video"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/ai_character_face_2.jpg"
          >
            {/* Add your video source here */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-dark-studio-39875-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-[140%] -top-[20%] bg-cover bg-center bg-no-repeat will-change-transform scale-110"
          style={{
            backgroundImage: `url('/images/ai_character_face_2.jpg')`,
            transform: `translate3d(0, ${parallaxOffset}px, 0)`,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>
      )}

      {/* Video Control - Professional Pill Button */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
        <button
          onClick={toggleVideo}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/50 text-white text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 hover:bg-gold hover:text-black"
        >
          <span className="relative flex h-2 w-2">
            {isVideoPlaying && useVideo && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isVideoPlaying && useVideo ? 'bg-gold' : 'bg-white/50'}`}></span>
          </span>
          Video
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20 h-full flex flex-col justify-center">
        <div className="max-w-5xl">
          <div className="overflow-hidden mb-10">
            <span className="inline-block px-4 py-2 border border-white/20 text-white/60 text-[9px] font-black uppercase tracking-[0.4em] backdrop-blur-sm animate-in slide-in-from-bottom duration-1000">
              High Fashion & Nightlife
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-serif font-bold leading-[0.8] mb-14 tracking-tighter text-white drop-shadow-2xl">
            Confidence <br />
            <span className="italic font-normal text-gold relative z-10 drop-shadow-md">is the New</span> <br />
            Glamour
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-lg mb-16 font-light leading-relaxed tracking-wide">
            Where urban edge meets elite couture. Elevating the standard for high-fashion inclusion and luxury travel.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-gold hover:bg-white text-black font-black py-6 px-12 flex items-center justify-center gap-4 transition-all duration-500 hover:-translate-y-1 uppercase tracking-[0.3em] text-[10px]">
              The Movement
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/20 hover:border-white text-white hover:text-black hover:bg-white py-6 px-12 transition-all duration-500 font-black uppercase tracking-[0.3em] text-[10px] backdrop-blur-sm">
              View Collection
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-16 right-16 rotate-90 origin-right">
        <span className="text-[11px] font-black tracking-[1.5em] text-white/40 uppercase italic">
          EST. 2024 • THE URBAN GLAM ARCHIVE
        </span>
      </div>
    </section>
  );
};

export default Hero;