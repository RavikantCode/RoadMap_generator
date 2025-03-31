'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AISuggestionModal from '../components/AISuggestionModal';

const TypingText = ({ content, onComplete }: { content: string; onComplete?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const lines = content.split('\n');
    const currentLine = lines[lineIndex];
    
    if (lineIndex < lines.length) {
      if (currentIndex < currentLine.length) {
        const typingInterval = setTimeout(() => {
          setDisplayedContent(prev => {
            const prevLines = lines.slice(0, lineIndex);
            return [...prevLines, currentLine.slice(0, currentIndex + 1)].join('\n');
          });
          setCurrentIndex(prev => prev + 1);
        }, 50);

        return () => clearTimeout(typingInterval);
      } else {
        const lineChangeTimeout = setTimeout(() => {
          setLineIndex(prev => prev + 1);
          setCurrentIndex(0);
        }, 500);

        return () => clearTimeout(lineChangeTimeout);
      }
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [content, currentIndex, lineIndex, onComplete]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-base font-medium text-left text-black whitespace-pre-line">
        {displayedContent.split('\n').map((line, idx) => (
          <div key={idx} className="animate-fadeIn">
            {line}
            {idx === lineIndex && !isComplete && (
              <span className="inline-block w-[2px] h-[16px] bg-black ml-[1px] align-middle animate-blink" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomNode = ({ data, isConnectable }: any) => {
  const router = useRouter();
  const nodeRef = useRef<HTMLDivElement>(null);

  if (!data.shouldBeVisible) return null;

  return (
    <div
      ref={nodeRef}
      className="transition-all duration-500 ease-in-out"
      style={{
        background: data.style?.background || '#ffffff',
        border: data.style?.border || '2px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        opacity: 1
      }}
    >
      <div 
        className="relative group cursor-pointer animate-nodeAppear"
        onClick={() => router.push(`/roadmap/step/${data.id}`)}
      >
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        
        <div className="min-h-[100px]">
          {data.isTyping ? (
            <TypingText 
              content={data.label} 
              onComplete={() => {
                if (data.onTypingComplete) {
                  data.onTypingComplete(data.id);
                }
              }}
            />
          ) : (
            <div className="text-base font-medium whitespace-pre-line">
              {data.label}
            </div>
          )}
        </div>

        <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};


const getEdgeId = (source: string, target: string) => `e${source}-${target}`;


const createEdge = (source: string, target: string): Edge => {
  if (!source || !target) {
    throw new Error('Both source and target are required for edge creation');
  }
  return {
    id: getEdgeId(source, target),
    source,
    target,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#94a3b8', strokeWidth: 2 }
  };
};


export default function DashboardPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleCareerSelect = useCallback((roadmapData: any[]) => {
    try {
      console.log('Received roadmap data in dashboard:', roadmapData);
      
     
      setEdges([]);
      setNodes([]);

      const newNodes = roadmapData.map((item: any, index: number) => ({
        id: item.id.toString(),
        type: 'custom',
        data: {
          label: item.data.label,
          isCompleted: false,
          shouldBeVisible: true,
          animationDelay: index * 1000
        },
        position: item.position,
        style: item.style
      }));

      setNodes(newNodes);

      let currentIndex = 0;
      const showNextNode = () => {
        if (currentIndex < newNodes.length) {
          setNodes(prevNodes =>
            prevNodes.map((node, idx) => ({
              ...node,
              data: {
                ...node.data,
                shouldBeVisible: idx <= currentIndex,
                isTyping: idx === currentIndex
              }
            }))
          );

          if (currentIndex > 0) {
            const newEdge = {
              id: `e${currentIndex-1}-${currentIndex}`,
              source: (currentIndex).toString(),
              target: (currentIndex + 1).toString(),
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#6366f1', strokeWidth: 2 }
            };
            setEdges(prev => [...prev, newEdge]);
          }

          currentIndex++;
          setTimeout(showNextNode, 2000);
        }
      };

      setTimeout(showNextNode, 500);

    } catch (error) {
      console.error('Error processing roadmap data:', error);
    }
  }, []);

  const handleTypingComplete = useCallback((nodeId: string) => {
    console.log('Typing complete for node:', nodeId);
    setNodes(prevNodes =>
      prevNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isTyping: false
        }
      }))
    );
  }, []);

  const onConnect = useCallback((params: Connection) => {
    const source = params.source;
    const target = params.target;
    if (!source || !target) return;
    
    try {
      const edge = createEdge(source, target);
      setEdges(prevEdges => {
        const exists = prevEdges.some(e => e.id === edge.id);
        if (exists) return prevEdges;
        
        return [...prevEdges, edge];
      });
    } catch (error) {
      console.error('Failed to create edge:', error);
    }
  }, []);

  const onEdgesDelete = useCallback((edgesToDelete: Edge[]) => {
    setEdges(prevEdges => 
      prevEdges.filter(edge => !edgesToDelete.some(e => e.id === edge.id))
    );
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: (newLabel: string) => {
            setNodes((prevNodes) =>
              prevNodes.map((n) => {
                if (n.id === node.id) {
                  return {
                    ...n,
                    data: {
                      ...n.data,
                      label: newLabel,
                    },
                  };
                }
                return n;
              })
            );
          },
          onComplete: (isCompleted: boolean) => {
            setNodes((prevNodes) =>
              prevNodes.map((n) => {
                if (n.id === node.id) {
                  return {
                    ...n,
                    data: {
                      ...n.data,
                      isCompleted,
                    },
                  };
                }
                return n;
              })
            );
          },
          onTypingComplete: handleTypingComplete,
        },
      }))
    );
  }, [setNodes, handleTypingComplete]);

  const handleSave = () => {
    console.log('Saving roadmap:', { nodes, edges });
  };

  const handleGenerateRoadmap = async (userInput: string) => {
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roadmap data');
      }

      const roadmapData = await response.json();
      console.log('Received roadmap data:', roadmapData);
      
      if (!Array.isArray(roadmapData)) {
        console.error('Expected array but got:', typeof roadmapData);
        return;
      }

      setEdges([]);
      setNodes([]);

      const newNodes = roadmapData.map((item: any, index: number) => ({
        ...item,
        data: {
          ...item.data,
          shouldBeVisible: false,
          isTyping: false
        }
      }));

      setNodes(newNodes);


      let currentIndex = 0;
      const showNextNode = () => {
        if (currentIndex < newNodes.length) {
          setNodes(prevNodes =>
            prevNodes.map((node, idx) => ({
              ...node,
              data: {
                ...node.data,
                shouldBeVisible: idx <= currentIndex,
                isTyping: idx === currentIndex
              }
            }))
          );

          if (currentIndex > 0) {
            const newEdge = {
              id: `e${currentIndex-1}-${currentIndex}`,
              source: newNodes[currentIndex - 1].id,
              target: newNodes[currentIndex].id,
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#2196f3', strokeWidth: 2 }
            };
            setEdges(prev => [...prev, newEdge]);
          }

          currentIndex++;
          setTimeout(showNextNode, 3000);
        }
      };

      setTimeout(showNextNode, 500);
      
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Get AI Suggestions
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save Roadmap
        </button>
      </div>

      <AISuggestionModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onSelect={handleCareerSelect}
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Learning Roadmap</h1>
            <p className="text-gray-600">Step-by-step visualization of your learning journey</p>
            <p className="text-sm text-gray-500 mt-1">Double-click any node to edit its content</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 h-[600px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        
        @keyframes nodeAppear {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-15px);
          }
          75% {
            opacity: 0.75;
            transform: translateY(8px);
          }
          90% {
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-nodeAppear {
          animation: nodeAppear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(8px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
