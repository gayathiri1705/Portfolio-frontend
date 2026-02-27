import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function SkillsAdmin() {
    const [skills, setSkills] = useState<any[]>([]);
    const [newSkill, setNewSkill] = useState({ name: '', category: '', level: 80 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/skills', newSkill);
            setNewSkill({ name: '', category: '', level: 80 });
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/skills/${id}`);
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    const categories = Array.from(new Set(skills.map(s => s.category)));

    return (
        <div className="space-y-8">
            {/* Create Form */}
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-semibold">Add New Skill</h3>
                <div className="flex gap-4">
                    <input
                        placeholder="Skill Name (e.g. React)"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded bg-background"
                    />
                    <input
                        placeholder="Category (e.g. Frontend)"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded bg-background"
                    />
                    <button onClick={handleCreate} className="px-6 py-2 bg-primary text-primary-foreground rounded-md">Add</button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold">Current Skills</h3>
                {categories.length === 0 && <p className="text-muted-foreground">No skills found.</p>}

                {categories.map(category => (
                    <div key={category as string} className="space-y-2">
                        <h4 className="font-medium text-lg capitalize border-b pb-1">{category}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skills.filter(s => s.category === category).map(skill => (
                                <div key={skill._id} className="border p-3 rounded-md flex justify-between items-center bg-card">
                                    <span>{skill.name}</span>
                                    <button
                                        onClick={() => handleDelete(skill._id)}
                                        className="text-red-500 hover:text-red-600 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
