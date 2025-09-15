
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{article.date}</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          <Link to={`/articles/${article.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {article.title}
          </Link>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{article.description}</p>
        <Link to={`/articles/${article.slug}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
