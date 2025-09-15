import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug } from '../services/articleService';
import { Article } from '../types';
import useSEO from '../hooks/useSEO';

const ArticlePage: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      setArticle(foundArticle || null);
    }
    setLoading(false);
  }, [slug]);

  const jsonLd = useMemo(() => {
    if (!article) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': article.title,
      'description': article.description,
      'datePublished': article.date,
      'author': {
        '@type': 'Organization',
        'name': '고불소치약 정보 허브',
      },
      'publisher': {
        '@type': 'Organization',
        'name': '고불소치약 정보 허브',
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
    };
  }, [article]);

  useSEO({
    title: article ? `${article.title} | 고불소치약 정보 허브` : 'Article Not Found',
    description: article ? article.description : 'The article you are looking for does not exist.',
    keywords: article ? article.keywords : undefined,
    jsonLd: jsonLd,
  });

  if (loading) {
    return <div className="text-center text-xl">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">The article you are looking for does not exist.</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
      <article className="prose prose-lg dark:prose-invert max-w-none prose-h1:text-blue-600 dark:prose-h1:text-blue-400 prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300">
        <div className="mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
          <h1 className="mb-2">{article.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{article.date}</p>
        </div>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
        <Link to="/" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Back to all articles
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;
