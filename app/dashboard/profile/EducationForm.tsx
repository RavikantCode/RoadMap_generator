'use client';

import React from 'react';
import { IconSchool } from '@tabler/icons-react';

interface Education {
  tenthBoard: string;
  tenthMarks: number;
  twelfthBoard: string;
  twelfthMarks: number;
  degree?: string;
  branch?: string;
  currentCGPA?: number;
}

interface Props {
  education: Education;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function EducationForm({ education, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <IconSchool className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Education Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            10th Board
          </label>
          <select
            name="tenthBoard"
            value={education.tenthBoard}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Select Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State">State Board</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            10th Marks (%)
          </label>
          <input
            type="number"
            name="tenthMarks"
            value={education.tenthMarks || ''}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            12th Board
          </label>
          <select
            name="twelfthBoard"
            value={education.twelfthBoard}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Select Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State">State Board</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            12th Marks (%)
          </label>
          <input
            type="number"
            name="twelfthMarks"
            value={education.twelfthMarks || ''}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            value={education.degree || ''}
            onChange={onChange}
            placeholder="e.g., B.Tech, BCA"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Branch
          </label>
          <input
            type="text"
            name="branch"
            value={education.branch || ''}
            onChange={onChange}
            placeholder="e.g., Computer Science"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Current CGPA
          </label>
          <input
            type="number"
            name="currentCGPA"
            value={education.currentCGPA || ''}
            onChange={onChange}
            step="0.01"
            max="10"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
    </div>
  );
}
