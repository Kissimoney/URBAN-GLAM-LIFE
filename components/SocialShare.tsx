import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, Mail } from 'lucide-react';

interface SocialShareProps {
    title: string;
    url: string;
    description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, description = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async () => {
        // Try native share API first (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: shareUrl,
                });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fallback to custom share menu
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="relative">
            {/* Share Button */}
            <button
                onClick={handleShare}
                className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-neutral-900 border border-white/10 hover:border-gold text-white hover:text-gold transition-all duration-500"
                aria-label="Share this article"
            >
                <Share2 className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-500" />
                <span className="font-bold uppercase tracking-wider text-xs">
                    Share Article
                </span>
            </button>

            {/* Share Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute top-full left-0 mt-4 w-80 bg-neutral-900 border border-white/10 p-6 z-50 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
                                Share This Article
                            </h4>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-neutral-500 hover:text-gold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Social Buttons */}
                        <div className="space-y-3 mb-6">
                            {/* Twitter */}
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-neutral-800 hover:bg-[#1DA1F2] text-white transition-all duration-500 group"
                            >
                                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm">Share on Twitter</span>
                            </a>

                            {/* Facebook */}
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-neutral-800 hover:bg-[#1877F2] text-white transition-all duration-500 group"
                            >
                                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm">Share on Facebook</span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-neutral-800 hover:bg-[#0A66C2] text-white transition-all duration-500 group"
                            >
                                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm">Share on LinkedIn</span>
                            </a>

                            {/* Email */}
                            <a
                                href={shareLinks.email}
                                className="flex items-center gap-4 p-4 bg-neutral-800 hover:bg-gold hover:text-black text-white transition-all duration-500 group"
                            >
                                <Mail size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm">Share via Email</span>
                            </a>
                        </div>

                        {/* Copy Link */}
                        <div className="pt-6 border-t border-white/10">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider font-bold mb-3">
                                Or Copy Link
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 px-4 py-3 bg-neutral-800 border border-white/10 text-neutral-400 text-sm focus:outline-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-6 py-3 font-bold uppercase tracking-wider text-xs transition-all duration-500 ${copied
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gold text-black hover:bg-white'
                                        }`}
                                >
                                    {copied ? (
                                        <Check size={16} />
                                    ) : (
                                        <LinkIcon size={16} />
                                    )}
                                </button>
                            </div>
                            {copied && (
                                <p className="text-green-500 text-xs mt-2 animate-in fade-in duration-300">
                                    ✓ Link copied to clipboard!
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SocialShare;
