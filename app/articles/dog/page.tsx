"use client";

import React, { useEffect, useState } from 'react';
import CategoryTabs from '@/components/CategoryTabs';
import ArticleCard from '@/components/ArticleCard';

type Article = {
  id?: string;
  title: string;
  snippet?: string;
  image?: string;
  date?: string;
  category?: string;
  link?: string;
};

// เปลี่ยนชื่อ mock data ไม่ให้ชนกับ state
const initialArticles: Article[] = [
  {
    category: "🐕 สุขภาพและการป้องกันโรค",
    title: "ภัยเงียบจากพยาธิหนอนหัวใจ: ป้องกันดีกว่ารักษา",
    snippet: "พยาธิหนอนหัวใจเป็นภัยร้ายที่คร่าชีวิตสุนัขได้ หากไม่ได้รับการป้องกันและรักษาที่ถูกต้อง ทำความเข้าใจอาการและการป้องกันเพื่อปกป้องเพื่อนรักของคุณ",
    image: "/assets/dog1.png",
  },
  {
    category: "🐕 สุขภาพและการป้องกันโรค",
    title: "วัคซีนจำเป็นสำหรับสุนัข: สิ่งที่เจ้าของมือใหม่ต้องรู้",
    snippet: "คู่มือฉบับสมบูรณ์สำหรับเจ้าของสุนัขมือใหม่เกี่ยวกับการฉีดวัคซีนที่จำเป็น เพื่อปกป้องลูกสุนัขของคุณจากโรคร้ายแรงต่างๆ",
    image: "/assets/dog2.png",
  },
  {
    category: "💊 โภชนาการอาหาร",
    title: "เช็คลิสต์! อาหารต้องห้าม 7 ชนิด ที่อันตรายถึงชีวิตสุนัข",
    snippet: "ปกป้องสุนัขของคุณให้ปลอดภัยจากอาหารอันตรายที่คุณอาจไม่รู้ เช็คลิสต์อาหาร 7 ชนิดที่ควรหลีกเลี่ยงเด็ดขาด",
    image: "/assets/dog3.png",
  },
  {
    category: "🦴 การดูแลเฉพาะช่วงวัย",
    title: "คู่มือการดูแลลูกสุนัข 3 เดือนแรก: วัคซีน อาหาร และการเข้าสังคม",
    snippet: "เริ่มต้นชีวิตที่ดีให้กับลูกสุนัขด้วยคู่มือการดูแลที่ครอบคลุมในช่วง 3 เดือนแรก ทั้งเรื่องวัคซีน โภชนาการ และการฝึกเข้าสังคม",
    image: "/assets/dog4.png",
  },
  {
    category: "🛁 การดูแลทั่วไปและการเลี้ยงดู",
    title: "วิธีแปรงฟันสุนัขง่าย ๆ ป้องกันหินปูน โดยไม่ต้องดมยา",
    snippet: "การดูแลสุขภาพช่องปากเป็นสิ่งสำคัญ เรียนรู้วิธีแปรงฟันสุนัขอย่างถูกวิธี เพื่อป้องกันปัญหาสุขภาพช่องปากและลดความจำเป็นในการวางยาสลบ",
    image: "/assets/dog5.png",
  },
  {
    category: "🩺 คลินิกพิเศษ",
    title: "5 สัญญาณเตือนโรคไตในสุนัขสูงวัย",
    snippet: "โรคไตเป็นโรคที่พบบ่อยในสุนัขสูงวัย เรียนรู้ 5 สัญญาณเตือนสำคัญ เพื่อการวินิจฉัยและการรักษาที่รวดเร็ว",
    image: "/assets/dog6.png",
  },
];

const categories = [
  "ทั้งหมด",
  "🐕 สุขภาพและการป้องกันโรค",
  "💊 โภชนาการอาหาร",
  "🦴 การดูแลเฉพาะช่วงวัย",
  "🛁 การดูแลทั่วไปและการเลี้ยงดู",
  "🩺 คลินิกพิเศษ"
];

export default function DogArticlePage() {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [articles, setArticles] = useState<Article[]>(initialArticles); // เริ่มด้วย mock
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // รับค่าเป็น string ตรง ๆ
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredArticles = articles.filter(article =>
    selectedCategory === 'ทั้งหมด' || article.category === selectedCategory
  );

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/articles?type=dog')
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && Array.isArray(json.data)) {
          setArticles(json.data);
        } else {
          setError(json?.error || 'Fetch failed');
        }
      })
      .catch((err) => setError(err?.message || 'Fetch error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="content-section dog-page page-animate">
      <div className="container">
        <h2 className="page-title">🐶 Dog Articles : บทความสำหรับสุนัข</h2>
        <div className="section-deco">
          <span className="decorative-bar" aria-hidden="true" />
        </div>

        <p className="intro-text page-subtitle">ข้อมูลสุขภาพและการเลี้ยงดูที่เชื่อถือได้จากสัตวแพทย์ Pawplan เพื่อคุณภาพชีวิตที่ดีที่สุดของเพื่อนซี้สี่ขาของคุณ</p>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <hr />

        <div className="article-card-grid page-content">
          {loading && <p>กำลังโหลด...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard key={article.id ?? `${article.title}-${index}`} article={article} />
            ))
          ) : (
            !loading && <p className="no-articles">ไม่พบข้อมูลบทความในหมวดหมู่ "{selectedCategory}"</p>
          )}
        </div>
      </div>
    </section>
  );
}