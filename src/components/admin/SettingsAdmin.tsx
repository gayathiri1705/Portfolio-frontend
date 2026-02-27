import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function SettingsAdmin() {
    const [settings, setSettings] = useState({
        hero_title: '',
        hero_subtitle: '',
        hero_description: '',
        about_text: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/settings');
            if (res.data) setSettings(prev => ({ ...prev, ...res.data }));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (key: string, value: string) => {
        try {
            await api.post('/settings', { key, value });
            alert('Saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2 text-foreground">Hero Section</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hero Title</label>
                    <div className="flex gap-2">
                        <input
                            name="hero_title"
                            value={settings.hero_title || ''}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground"
                        />
                        <button onClick={() => handleSave('hero_title', settings.hero_title)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Save</button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hero Subtitle</label>
                    <div className="flex gap-2">
                        <input
                            name="hero_subtitle"
                            value={settings.hero_subtitle || ''}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground"
                        />
                        <button onClick={() => handleSave('hero_subtitle', settings.hero_subtitle)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Save</button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hero Description</label>
                    <div className="flex gap-2">
                        <textarea
                            name="hero_description"
                            value={settings.hero_description || ''}
                            onChange={handleChange}
                            rows={3}
                            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground resize-none"
                        />
                        <button onClick={() => handleSave('hero_description', settings.hero_description)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm h-fit mt-auto mb-auto">Save</button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2 text-foreground">About Section</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium">About Text</label>
                    <div className="flex gap-2">
                        <textarea
                            name="about_text"
                            value={settings.about_text || ''}
                            onChange={handleChange}
                            rows={5}
                            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground"
                        />
                        <button onClick={() => handleSave('about_text', settings.about_text)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm h-fit">Save</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
