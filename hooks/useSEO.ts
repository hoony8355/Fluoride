import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  jsonLd?: object;
}

const setMetaTag = (attrName: string, attrValue: string, content: string) => {
  let element = document.querySelector(`meta[${attrName}='${attrValue}']`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const useSEO = ({ title, description, keywords, jsonLd }: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    
    // Update Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);

    // Update Twitter card tags
    setMetaTag('property', 'twitter:card', 'summary');
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);

    // Handle JSON-LD
    const jsonLdScriptId = 'json-ld-script';
    let script = document.getElementById(jsonLdScriptId) as HTMLScriptElement | null;
    
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = jsonLdScriptId;
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(jsonLd);
    } else if (script) {
      // Clean up script if no jsonLd is provided on a subsequent render
      script.remove();
    }

    // Cleanup function to remove JSON-LD on component unmount
    return () => {
      const scriptToRemove = document.getElementById(jsonLdScriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, jsonLd]);
};

export default useSEO;
