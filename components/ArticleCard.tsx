import Link from 'next/link';
// แบบง่ายที่สุด
export default function ArticleCard({ article }: { article: any }) {
    return (
        <div className="article-card">
            <div className="card-image-wrapper">
                {/*
                  Build image path defensively:
                  - If article.image already starts with '/', treat it as a public-root path
                    (e.g. '/assets/dog1.png'). The `public` folder is served at '/'.
                  - Otherwise assume the file is under /images/articles/dog/<filename>.
                  This makes the component work with both styles and avoids missing-image issues.
                */}
                {
                    (() => {
                        const img = article?.image || '';
                        // fix https:/ → https://
                        const fixedImg = img.replace(/^https:\/([^/])/, 'https://$1').replace(/^http:\/([^/])/, 'http://$1');
                        const imageSrc = fixedImg.startsWith('/') || fixedImg.startsWith('http') ? fixedImg : `/images/articles/${fixedImg}`;
                        return (
                            <img
                                src={imageSrc}
                                alt={article.title}
                                className="card-image"
                            />
                        );
                    })()
                }
            </div>
            <div className="card-content">
                <p className="card-category">{article.category.replace(/[^ก-๙a-zA-Z ]/g, '')}</p>
                <h4 className="card-title">{article.title}</h4>
                <p className="card-snippet">{article.snippet}</p>
                <div className="card-meta">
                    <span className="card-date">{article.date}</span>
                </div>
            </div>
        </div>
    );
}