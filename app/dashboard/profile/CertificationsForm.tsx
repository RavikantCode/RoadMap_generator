'use client';

import React, { useState } from 'react';
import { IconCertificate, IconPlus, IconX } from '@tabler/icons-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface Props {
  certifications: Certification[];
  onAdd: (cert: Certification) => void;
  onRemove: (index: number) => void;
}

export default function CertificationsForm({ certifications, onAdd, onRemove }: Props) {
  const [newCert, setNewCert] = useState<Certification>({
    name: '',
    issuer: '',
    date: '',
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCert.name && newCert.issuer) {
      onAdd(newCert);
      setNewCert({ name: '', issuer: '', date: '', url: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <IconCertificate className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Certifications</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Certificate Name
            </label>
            <input
              type="text"
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              placeholder="e.g., AWS Solutions Architect"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Issuing Organization
            </label>
            <input
              type="text"
              value={newCert.issuer}
              onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
              placeholder="e.g., Amazon Web Services"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date of Completion
            </label>
            <input
              type="date"
              value={newCert.date}
              onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Certificate URL (Optional)
            </label>
            <input
              type="url"
              value={newCert.url}
              onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
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
          Add Certification
        </button>
      </form>

 
      <div className="space-y-4 mt-8">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div>
              <h3 className="text-white font-medium">{cert.name}</h3>
              <p className="text-gray-400 text-sm">{cert.issuer}</p>
              <p className="text-gray-500 text-sm">
                {new Date(cert.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
            >
              <IconX size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
