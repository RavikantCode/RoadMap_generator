'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconEdit, IconCheck, IconX } from '@tabler/icons-react';

interface StepData {
  id: string;
  title: string;
  description: string;
  resources?: string[];
  prerequisites?: string[];
  nextSteps?: string;
}

const roadmapSteps: Record<string, StepData> = {
  '1': {
    id: '1',
    title: 'Learn HTML & CSS',
    description: 'Master the fundamentals of web development with HTML for structure and CSS for styling.',
    resources: ['MDN Web Docs', 'W3Schools', 'freeCodeCamp'],
    prerequisites: [],
    nextSteps: 'Move on to JavaScript Fundamentals',
  },
  '2': {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Learn core JavaScript concepts including variables, functions, and DOM manipulation.',
    resources: ['JavaScript.info', 'Eloquent JavaScript', 'JavaScript30'],
    prerequisites: ['HTML & CSS Basics'],
    nextSteps: 'Explore modern JavaScript frameworks',
  },
  '3': {
    id: '3',
    title: 'React Fundamentals',
    description: 'Learn React.js including components, state management, and hooks.',
    resources: ['React Docs', 'React Tutorial', 'React for Beginners'],
    prerequisites: ['JavaScript Fundamentals'],
    nextSteps: 'Build full-stack applications',
  },
};

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const stepId = params.id as string;
  const [step, setStep] = useState(roadmapSteps[stepId]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStep, setEditedStep] = useState(step);

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Step not found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setStep(editedStep);
    setIsEditing(false);
    console.log('Saving changes:', editedStep);
  };

  const handleCancel = () => {
    setEditedStep(step);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen relative py-8 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStep.title}
                    onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                    className="text-3xl font-bold w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {step.title}
                  </h1>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-green-400 hover:text-green-300 p-2 hover:bg-green-400/10 rounded-xl transition-all"
                    >
                      <IconCheck size={24} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                      <IconX size={24} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-400/10 rounded-xl transition-all"
                  >
                    <IconEdit size={24} />
                  </button>
                )}
                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-gray-400 hover:text-white px-4 py-2 rounded-xl transition-all hover:bg-white/5"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              {isEditing ? (
                <textarea
                  value={editedStep.description}
                  onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                  rows={4}
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Resources</h2>
              {isEditing ? (
                <div className="space-y-2">
                  {editedStep.resources?.map((resource, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={resource}
                        onChange={(e) => {
                          const newResources = [...(editedStep.resources || [])];
                          newResources[idx] = e.target.value;
                          setEditedStep({ ...editedStep, resources: newResources });
                        }}
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                      />
                      <button
                        onClick={() => {
                          const newResources = editedStep.resources?.filter((_, i) => i !== idx);
                          setEditedStep({ ...editedStep, resources: newResources });
                        }}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <IconX size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newResources = [...(editedStep.resources || []), ''];
                      setEditedStep({ ...editedStep, resources: newResources });
                    }}
                    className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
                  >
                    + Add Resource
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {step.resources?.map((resource, idx) => (
                    <li key={idx}>
                      <a
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Prerequisites</h2>
              {isEditing ? (
                <div className="space-y-2">
                  {editedStep.prerequisites?.map((prereq, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={prereq}
                        onChange={(e) => {
                          const newPrereqs = [...(editedStep.prerequisites || [])];
                          newPrereqs[idx] = e.target.value;
                          setEditedStep({ ...editedStep, prerequisites: newPrereqs });
                        }}
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                      />
                      <button
                        onClick={() => {
                          const newPrereqs = editedStep.prerequisites?.filter((_, i) => i !== idx);
                          setEditedStep({ ...editedStep, prerequisites: newPrereqs });
                        }}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <IconX size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newPrereqs = [...(editedStep.prerequisites || []), ''];
                      setEditedStep({ ...editedStep, prerequisites: newPrereqs });
                    }}
                    className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
                  >
                    + Add Prerequisite
                  </button>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {step.prerequisites?.map((prereq, idx) => (
                    <li key={idx} className="text-gray-300">{prereq}</li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
              {isEditing ? (
                <textarea
                  value={editedStep.nextSteps}
                  onChange={(e) => setEditedStep({ ...editedStep, nextSteps: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                  rows={2}
                />
              ) : (
                <p className="text-gray-300">{step.nextSteps}</p>
              )}
            </section>
          </div>

          <div className="border-t border-white/10 px-6 py-4 bg-white/5">
            <div className="flex justify-between">
              {parseInt(stepId) > 1 && (
                <button
                  onClick={() => router.push(`/roadmap/step/${parseInt(stepId) - 1}`)}
                  className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
                >
                  ← Previous Step
                </button>
              )}
              {parseInt(stepId) < Object.keys(roadmapSteps).length && (
                <button
                  onClick={() => router.push(`/roadmap/step/${parseInt(stepId) + 1}`)}
                  className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10 ml-auto"
                >
                  Next Step →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
