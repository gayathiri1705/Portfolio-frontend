import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ArticlesAdmin() {
    const [articles, setArticles] = useState<any[]>([]);
    const [newArticle, setNewArticle] = useState({ title: '', excerpt: '', content: '', link: '', readTime: '5 min read', category: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await api.get('/articles');
            setArticles(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/articles', newArticle);
            setNewArticle({ title: '', excerpt: '', content: '', link: '', readTime: '5 min read', category: '' });
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/articles/${id}`);
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Create Form */}
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-semibold">Add New Article</h3>
                <input
                    placeholder="Article Title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded bg-background"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        placeholder="Category (e.g. Tutorial)"
                        value={newArticle.category}
                        onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="Read Time (e.g. 5 min read)"
                        value={newArticle.readTime}
                        onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="External Link (Optional)"
                        value={newArticle.link}
                        onChange={(e) => setNewArticle({ ...newArticle, link: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                </div>
                <textarea
                    placeholder="Short Excerpt (shows on card)"
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border rounded bg-background"
                    rows={2}
                />
                <textarea
                    placeholder="Full Content (Markdown or Text)"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded bg-background"
                    rows={4}
                />
                <button onClick={handleCreate} className="px-4 py-2 bg-primary text-primary-foreground rounded-md w-full">Add Article</button>
            </div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Current Articles</h3>
                <div className="grid gap-4">
                    {articles.map(article => (
                        <div key={article._id} className="border p-4 rounded-lg flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-lg">{article.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>{new Date(article.date).toLocaleDateString()}</span>
                                    <span>{article.category}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(article._id)}
                                className="text-red-500 hover:bg-red-500/10 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {articles.length === 0 && <p className="text-muted-foreground">No articles found.</p>}
                </div>
            </div>
        </div>
    );
}
