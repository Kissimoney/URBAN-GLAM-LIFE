import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image = '/og-image.jpg',
    url = 'https://urbanglam.life',
    type = 'website'
}) => {
    const fullTitle = `${title} | Urban Glam Life`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:site_name" content="Urban Glam Life" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Theme & Brand */}
            <meta name="theme-color" content="#000000" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Helmet>
    );
};

export default SEO;
