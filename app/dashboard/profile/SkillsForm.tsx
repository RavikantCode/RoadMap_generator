'use client';

import React, { useState } from 'react';
import { IconCode, IconBulb, IconPlus, IconX } from '@tabler/icons-react';

interface Skills {
  technical: string[];
  soft: string[];
}

interface Props {
  skills: Skills;
  interests: string[];
  onSkillsChange: (skills: Skills) => void;
  onInterestsChange: (interests: string[]) => void;
}

export default function SkillsForm({ skills, interests, onSkillsChange, onInterestsChange }: Props) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addTechnicalSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTechnicalSkill.trim()) {
      onSkillsChange({
        ...skills,
        technical: [...skills.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const addSoftSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSoftSkill.trim()) {
      onSkillsChange({
        ...skills,
        soft: [...skills.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const addInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim()) {
      onInterestsChange([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onSkillsChange({
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index)
    });
  };

  const removeSoftSkill = (index: number) => {
    onSkillsChange({
      ...skills,
      soft: skills.soft.filter((_, i) => i !== index)
    });
  };

  const removeInterest = (index: number) => {
    onInterestsChange(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconCode className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold text-white">Technical Skills</h2>
        </div>

        <form onSubmit={addTechnicalSkill} className="flex gap-2">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="e.g., React, Python, AWS"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            type="submit"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <IconPlus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {skills.technical.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20"
            >
              <span className="text-blue-400">{skill}</span>
              <button
                onClick={() => removeTechnicalSkill(index)}
                className="text-blue-400 hover:text-red-400 transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconBulb className="text-purple-400" size={24} />
          <h2 className="text-xl font-semibold text-white">Soft Skills</h2>
        </div>

        <form onSubmit={addSoftSkill} className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="e.g., Leadership, Communication"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            type="submit"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <IconPlus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {skills.soft.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20"
            >
              <span className="text-purple-400">{skill}</span>
              <button
                onClick={() => removeSoftSkill(index)}
                className="text-purple-400 hover:text-red-400 transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconBulb className="text-pink-400" size={24} />
          <h2 className="text-xl font-semibold text-white">Interests</h2>
        </div>

        <form onSubmit={addInterest} className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g., Machine Learning, Web Development"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            type="submit"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <IconPlus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 rounded-lg border border-pink-500/20"
            >
              <span className="text-pink-400">{interest}</span>
              <button
                onClick={() => removeInterest(index)}
                className="text-pink-400 hover:text-red-400 transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
