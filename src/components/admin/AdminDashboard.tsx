import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';

// Admin Sections
import ProjectsAdmin from './ProjectsAdmin';
import SkillsAdmin from './SkillsAdmin';
import SettingsAdmin from './SettingsAdmin';
import ArticlesAdmin from './ArticlesAdmin';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('settings');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if authenticated
        const checkAuth = async () => {
            try {
                await api.get('/auth/verify');
            } catch (error) {
                console.error("Not authenticated", error);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col h-auto md:h-screen">
                <h2 className="text-2xl font-bold mb-8 text-foreground">Admin Panel</h2>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                    >
                        General Settings (Hero/About)
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'projects' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                    >
                        Manage Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'skills' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                    >
                        Manage Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'articles' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                    >
                        Manage Articles
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto pt-4 border-t border-border text-red-500 hover:text-red-400 font-medium text-left px-4"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab} Management</h1>

                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    {activeTab === 'settings' && <SettingsAdmin />}
                    {activeTab === 'projects' && <ProjectsAdmin />}
                    {activeTab === 'skills' && <SkillsAdmin />}
                    {activeTab === 'articles' && <ArticlesAdmin />}
                </div>
            </main>
        </div>
    );
}
