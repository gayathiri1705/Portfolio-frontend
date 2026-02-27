import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

const Skills = () => {
  const fallbackCategories = [
    {
      title: 'Full Stack Developer',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'TypeScript' },
        { name: 'Express.js' },
        { name: 'REST API' },
      ],
    },
    {
      title: 'Others',
      skills: [
        { name: 'Ardiuno' },
        { name: '8051 MC' },
        { name: 'C & C++' },
        { name: 'Blynk & Thinger.io' },
        { name: 'Ubuntu(RSPI)' },
      ],
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git & GitHub' },
        { name: 'Canva' },
        { name: 'Firebase' },
        { name: 'Chrome DevTools' },
        { name: 'Axios' },
      ],
    },
  ];

  const [skillCategories, setSkillCategories] = useState<any[]>(fallbackCategories);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        if (res.data && res.data.length > 0) {
          // Group by category
          const grouped: Record<string, any[]> = {};
          res.data.forEach((skill: any) => {
            if (!grouped[skill.category]) {
              grouped[skill.category] = [];
            }
            grouped[skill.category].push({ name: skill.name });
          });

          const newCategories = Object.keys(grouped).map(key => ({
            title: key,
            skills: grouped[key]
          }));

          setSkillCategories(newCategories);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Skills & Expertise</h2>
        <p className="text-gray-600">Technologies and tools I work with</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-6 text-center text-blue-600">
              {category.title}
            </h3>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="px-4 py-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <span className="text-gray-800">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;