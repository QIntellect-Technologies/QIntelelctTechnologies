import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    structuredData?: object | object[];
}

const DEFAULT_OG_IMAGE = 'https://www.qintellecttechnologies.com/og-image.png';
const SITE_NAME = 'QIntellect Technologies';

const useSEO = ({
    title,
    description,
    keywords,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    structuredData,
}: SEOProps) => {
    useEffect(() => {
        // --- Title ---
        document.title = title;

        // --- Helper to set/create meta ---
        const setMeta = (selector: string, attr: string, content: string) => {
            let el = document.querySelector<HTMLMetaElement>(selector);
            if (!el) {
                el = document.createElement('meta');
                const parts = selector.match(/\[([^\]]+)="([^"]+)"\]/);
                if (parts) el.setAttribute(parts[1], parts[2]);
                document.head.appendChild(el);
            }
            el.setAttribute(attr, content);
        };

        // --- Helper to set/create link ---
        const setLink = (rel: string, href: string) => {
            let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        // --- Basic Meta ---
        setMeta('meta[name="description"]', 'content', description);
        if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);
        setMeta('meta[name="robots"]', 'content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // --- Canonical ---
        if (canonical) setLink('canonical', canonical);

        // --- Open Graph ---
        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[property="og:image"]', 'content', ogImage);
        setMeta('meta[property="og:type"]', 'content', ogType);
        setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
        if (canonical) setMeta('meta[property="og:url"]', 'content', canonical);

        // --- Twitter Card ---
        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', 'content', title);
        setMeta('meta[name="twitter:description"]', 'content', description);
        setMeta('meta[name="twitter:image"]', 'content', ogImage);
        setMeta('meta[name="twitter:site"]', 'content', '@QIntellectTech');

        // --- JSON-LD Structured Data ---
        if (structuredData) {
            const existingScript = document.querySelector('script[data-seo="page-schema"]');
            if (existingScript) existingScript.remove();
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-seo', 'page-schema');
            const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
            script.textContent = JSON.stringify(dataArray.length === 1 ? dataArray[0] : dataArray);
            document.head.appendChild(script);
        }

        return () => {
            // Cleanup page-specific structured data on unmount
            const script = document.querySelector('script[data-seo="page-schema"]');
            if (script) script.remove();
        };
    }, [title, description, keywords, canonical, ogImage, ogType, structuredData]);
};

export default useSEO;
