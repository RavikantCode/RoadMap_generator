'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const RoadmapBoard: React.FC = () => {
  const [roadmapStages, setRoadmapStages] = React.useState([
    { id: 1, title: 'Learn Foundations', status: 'completed' },
    { id: 2, title: 'Advanced Concepts', status: 'in-progress' },
    { id: 3, title: 'Specialization', status: 'pending' },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 border-green-500';
      case 'in-progress': return 'bg-blue-500/20 border-blue-500';
      case 'pending': return 'bg-gray-500/20 border-gray-500';
      default: return 'bg-gray-500/10 border-gray-500';
    }
  };

  return (
    <div className="relative bg-white/5 rounded-2xl border border-white/10 p-8 min-h-[600px]">
      {/* Whiteboard Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[length:40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-white"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Career Roadmap</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
            <FaPlus />
          </button>
        </div>

        <div className="space-y-4">
          {roadmapStages.map((stage) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                flex justify-between items-center 
                p-4 rounded-xl border 
                ${getStatusColor(stage.status)}
              `}
            >
              <div>
                <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
                <p className="text-gray-400 capitalize">{stage.status.replace('-', ' ')}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-600">
                  <FaEdit />
                </button>
                <button className="text-red-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapBoard;