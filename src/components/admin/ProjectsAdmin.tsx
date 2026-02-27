import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', link: '', github: '', image: '', tags: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const payload = { ...newProject, tags: newProject.tags.split(',').map(t => t.trim()) };
            await api.post('/projects', payload);
            setNewProject({ title: '', description: '', link: '', github: '', image: '', tags: '' });
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Create Form */}
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-semibold">Add New Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="Image URL"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="Live Demo Link"
                        value={newProject.link}
                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="GitHub Link"
                        value={newProject.github}
                        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                        className="px-3 py-2 border rounded bg-background"
                    />
                </div>
                <textarea
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded bg-background"
                    rows={3}
                />
                <input
                    placeholder="Tags (comma separated, e.g. React, Node, Tailwind)"
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    className="w-full px-3 py-2 border rounded bg-background"
                />
                <button onClick={handleCreate} className="px-4 py-2 bg-primary text-primary-foreground rounded-md w-full">Add Project</button>
            </div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Current Projects</h3>
                <div className="grid gap-4">
                    {projects.map(project => (
                        <div key={project._id} className="border p-4 rounded-lg flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-lg">{project.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                <div className="flex gap-2 mt-2">
                                    {project.tags.map((tag: string) => <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">{tag}</span>)}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="text-red-500 hover:bg-red-500/10 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {projects.length === 0 && <p className="text-muted-foreground">No projects found.</p>}
                </div>
            </div>
        </div>
    );
}
