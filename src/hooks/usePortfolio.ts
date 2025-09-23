import { useState, useEffect } from 'react';
import { Project, PortfolioData } from '../types/portfolio';

export const usePortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        const data: PortfolioData = await response.json();
        
        setProjects(data.projects);
        setCategories(['all', ...data.categories.filter(c => c.id !== 'all').map(c => c.id)]);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const getProjectsByCategory = (category: string): Project[] => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  };

  const getProjectById = (id: number): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const searchProjects = (query: string): Project[] => {
    if (!query.trim()) return projects;
    
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
      project.integrations.some(integration => integration.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    projects,
    categories,
    loading,
    error,
    getProjectsByCategory,
    getProjectById,
    searchProjects
  };
};

export default usePortfolio;