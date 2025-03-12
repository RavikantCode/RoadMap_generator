'use client';

import React, { useState } from 'react';
import { IconBrandGithub, IconPlus, IconX } from '@tabler/icons-react';

interface Project {
  name: string;
  description: string;
  techStack: string[];
  url?: string;
}

interface Props {
  projects: Project[];
  onAdd: (project: Project) => void;
  onRemove: (index: number) => void;
}

export default function ProjectsForm({ projects, onAdd, onRemove }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: [] as string[],
    url: '',
    techInput: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTechStack = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (formData.techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, prev.techInput.trim()],
        techInput: ''
      }));
    }
  };

  const removeTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.techStack.length > 0) {
      const newProject = {
        name: formData.name,
        description: formData.description,
        techStack: [...formData.techStack],
        url: formData.url || undefined
      };
      onAdd(newProject);
      setFormData({
        name: '',
        description: '',
        techStack: [],
        url: '',
        techInput: ''
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechStack(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <IconBrandGithub className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Projects</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., E-commerce Platform"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Tech Stack
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="techInput"
                value={formData.techInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="e.g., React, Node.js"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                type="button"
                onClick={addTechStack}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <IconPlus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20"
                >
                  <span className="text-blue-400">{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className="text-blue-400 hover:text-red-400 transition-colors"
                  >
                    <IconX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Project URL (Optional)
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <IconPlus size={20} />
          Add Project
        </button>
      </form>

      {/* List of Added Projects */}
      <div className="space-y-4 mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-white font-medium">{project.name}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-500/10 rounded text-sm text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Project →
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
