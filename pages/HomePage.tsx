import React, { useState, useEffect } from 'react';
import { getArticles } from '../services/articleService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import useSEO from '../hooks/useSEO';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useSEO({
    title: '고불소치약 정보 허브 | 전문가가 알려주는 모든 것',
    description: '고불소치약의 효과, 올바른 사용법, 부작용, 추천 제품까지. 당신의 건강한 치아를 위한 필수 정보를 확인하세요.',
    keywords: '고불소치약, 충치 예방, 불소 치약, 치아 관리, 구강 건강',
  });

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          고불소치약 정보 허브
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
          당신의 구강 건강을 위한 전문가의 깊이 있는 정보
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
