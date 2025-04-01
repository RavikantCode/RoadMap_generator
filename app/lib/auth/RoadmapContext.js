'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const RoadmapContext = createContext();

export function RoadmapProvider({ children }) {
  const [roadmapNodes, setRoadmapNodes] = useState([]);
  const [roadmapEdges, setRoadmapEdges] = useState([]);


  useEffect(() => {
    try {
      const savedNodes = localStorage.getItem('roadmapNodes');
      const savedEdges = localStorage.getItem('roadmapEdges');
      
      if (savedNodes) setRoadmapNodes(JSON.parse(savedNodes));
      if (savedEdges) setRoadmapEdges(JSON.parse(savedEdges));
    } catch (error) {
      console.error('Error loading roadmap data from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('roadmapNodes', JSON.stringify(roadmapNodes));
      localStorage.setItem('roadmapEdges', JSON.stringify(roadmapEdges));
    } catch (error) {
      console.error('Error saving roadmap data to localStorage:', error);
    }
  }, [roadmapNodes, roadmapEdges]);

  const updateRoadmap = (nodes, edges) => {
    setRoadmapNodes(nodes);
    setRoadmapEdges(edges);
  };

  return (
    <RoadmapContext.Provider value={{ roadmapNodes, roadmapEdges, updateRoadmap }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}