'use client';

import { useState, useEffect } from 'react';
import HideHeader from '@/components/HideHeader';
import HideFooter from '@/components/HideFooter';
import AdminSidebar from '@/components/AdminSidebar';
import { Edit, Trash2, FileText, Megaphone, Newspaper, Plus } from 'lucide-react';

interface ContentPost {
    id: number;
    title: string;
    content: string;
    type: 'news' | 'article' | 'announcement';
    imageUrl?: string;
    createdAt?: string;
}

const EMPTY_FORM = { title: '', content: '', type: 'news' as const, imageUrl: '' };

function getIcon(type: string) {
    if (type === 'announcement') return Megaphone;
    if (type === 'article') return FileText;
    return Newspaper;
}

function formatDate(date?: string) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ContentPage() {
    const [posts, setPosts] = useState<ContentPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<ContentPost | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    /* ---- Data ---- */
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content');
            if (!res.ok) { setPosts([]); return; }
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch {
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    /* ---- Modal helpers ---- */
    const openCreate = () => {
        setForm(EMPTY_FORM);
        setEditingPost(null);
        setIsCreateOpen(true);
    };

    const openEdit = (post: ContentPost) => {
        setForm({ title: post.title, content: post.content, type: post.type, imageUrl: post.imageUrl || '' });
        setEditingPost(post);
        setIsCreateOpen(true);
    };

    const closeModal = () => {
        setIsCreateOpen(false);
        setEditingPost(null);
    };

    /* ---- CRUD ---- */
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingPost) {
                await fetch(`/api/content/${editingPost.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
            } else {
                await fetch('/api/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
            }
            closeModal();
            fetchPosts();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this post?')) return;
        await fetch(`/api/content/${id}`, { method: 'DELETE' });
        fetchPosts();
    };

    /* ---- Render ---- */
    return (
        <div className="admin-layout">
            <HideHeader />
            <div className="admin-container-new">

                <AdminSidebar />

                <div className="admin-content-new">

                    {/* Header */}
                    <div className="admin-header-new">
                        <div>
                            <h1>Content Management</h1>
                            <p>Manage news, articles, and announcements.</p>
                        </div>
                        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                            <Plus size={16} style={{ display: 'inline', marginRight: 6 }} />
                            New Post
                        </button>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="content-posts-grid">
                            {[1, 2, 3].map((i) => <div key={i} className="content-post-skeleton" />)}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="stat-card-new" style={{ textAlign: 'center', padding: '4rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No posts found.</p>
                            <button className="admin-btn admin-btn-primary" onClick={openCreate}>+ New Post</button>
                        </div>
                    ) : (
                        <div className="content-posts-grid">
                            {posts.map((post) => {
                                const Icon = getIcon(post.type);
                                return (
                                    <div key={post.id} className="content-post-card">

                                        {/* Image */}
                                        {post.imageUrl ? (
                                            <div className="content-post-card__image">
                                                <img src={post.imageUrl} alt={post.title} />
                                            </div>
                                        ) : (
                                            <div className="content-post-card__image content-post-card__image--placeholder">
                                                <Icon size={40} style={{ opacity: 0.25 }} />
                                            </div>
                                        )}

                                        {/* Body */}
                                        <div className="content-post-card__body">
                                            <div className="content-post-card__meta">
                                                <span className="content-post-card__badge">{post.type}</span>
                                                <span className="content-post-card__date">{formatDate(post.createdAt)}</span>
                                            </div>
                                            <h3 className="content-post-card__title">{post.title}</h3>
                                            <p className="content-post-card__excerpt">{post.content}</p>
                                        </div>

                                        {/* Footer */}
                                        <div className="content-post-card__footer">
                                            <button className="content-post-card__btn-edit" onClick={() => openEdit(post)}>
                                                <Edit size={14} /> Edit
                                            </button>
                                            <button className="content-post-card__btn-delete" onClick={() => handleDelete(post.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <HideFooter />

            {/* ===== MODAL ===== */}
            {isCreateOpen && (
                <div className="content-modal-overlay" onClick={closeModal}>
                    <form className="content-modal" onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>

                        <div className="content-modal__header">
                            <h2 className="content-modal__title">
                                {editingPost ? 'Edit Post' : 'Create New Post'}
                            </h2>
                            <button type="button" className="content-modal__close" onClick={closeModal}>✕</button>
                        </div>

                        <div className="content-modal__field">
                            <label className="content-modal__label">Title</label>
                            <input
                                required
                                className="content-modal__input"
                                placeholder="Post title..."
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </div>

                        <div className="content-modal__field">
                            <label className="content-modal__label">Type</label>
                            <select
                                className="content-modal__input"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as ContentPost['type'] })}
                            >
                                <option value="news">News</option>
                                <option value="article">Article</option>
                                <option value="announcement">Announcement</option>
                            </select>
                        </div>

                        <div className="content-modal__field">
                            <label className="content-modal__label">Content</label>
                            <textarea
                                required
                                className="content-modal__input content-modal__textarea"
                                placeholder="Write your content here..."
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                            />
                        </div>

                        <div className="content-modal__field">
                            <label className="content-modal__label">Cover Image URL (Optional)</label>
                            <input
                                className="content-modal__input"
                                placeholder="https://..."
                                value={form.imageUrl}
                                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                            />
                        </div>

                        <div className="content-modal__footer">
                            <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Post'}
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
}