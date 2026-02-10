
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
    return (
        <Helmet>
            <title>{title} | Urban Glam</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};

export default SEO;
