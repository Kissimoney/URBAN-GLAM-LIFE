import React from 'react';
import BlogSearch from '../components/BlogSearch';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BlogPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black">
            {/* Back Button */}
            <div className="fixed top-8 left-8 z-50">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/60 hover:text-gold transition-all duration-500 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest font-bold">Back</span>
                </button>
            </div>

            {/* Blog Search Component */}
            <BlogSearch />
        </div>
    );
};

export default BlogPage;
