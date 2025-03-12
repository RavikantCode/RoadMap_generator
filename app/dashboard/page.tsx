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

// Typing Animation Component
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
        }, 50); // Slower typing speed for better readability

        return () => clearTimeout(typingInterval);
      } else {
        const lineChangeTimeout = setTimeout(() => {
          setLineIndex(prev => prev + 1);
          setCurrentIndex(0);
        }, 500); // Longer pause between lines

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
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted || false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Check if this node has already been animated
    const animatedNodes = JSON.parse(localStorage.getItem('animatedNodes') || '[]');
    const hasBeenAnimated = animatedNodes.includes(data.id);

    if (data.shouldBeVisible) {
      if (hasBeenAnimated) {
        // If already animated before, show immediately without typing animation
        setIsVisible(true);
        setIsTyping(false);
      } else {
        // If not animated before, show with typing animation after delay
        const showTimeout = setTimeout(() => {
          setIsVisible(true);
          setIsTyping(true);
          // Store this node as animated
          localStorage.setItem('animatedNodes', JSON.stringify([...animatedNodes, data.id]));
        }, data.animationDelay || 0);
        return () => clearTimeout(showTimeout);
      }
    }
  }, [data.shouldBeVisible, data.animationDelay, data.id]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleClick = () => {
    router.push(`/roadmap/step/${data.id}`);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (data.onChange) data.onChange(label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (data.onChange) data.onChange(label);
    }
  };

  const toggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (data.onComplete) data.onComplete(newState);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`bg-white border-2 ${isCompleted ? 'border-purple-500/50' : 'border-gray-200'} 
        rounded-lg shadow-lg p-4 w-[300px] relative group transition-all duration-500 
        cursor-pointer hover:shadow-xl animate-nodeAppear`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="absolute top-0 right-0">
        <button
          onClick={toggleComplete}
          className={`w-0 h-0 border-[16px] transition-all duration-200
            ${isCompleted 
              ? 'border-t-purple-500 border-l-transparent border-b-transparent border-r-indigo-500 hover:border-t-purple-600 hover:border-r-indigo-600' 
              : 'border-t-gray-200 border-l-transparent border-b-transparent border-r-gray-200 hover:border-t-gray-300 hover:border-r-gray-300'}`}
        >
        </button>
      </div>
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 text-base font-medium text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
          autoFocus
        />
      ) : (
        <div className="flex items-center justify-center w-full min-h-[48px] px-3">
          <div className="w-full overflow-hidden">
            {isTyping ? (
              <TypingText 
                content={label} 
                onComplete={() => {
                  if (data.onTypingComplete) {
                    data.onTypingComplete(data.id);
                  }
                }} 
              />
            ) : (
              <div className="text-base font-medium text-black text-center whitespace-pre-line">
                {label}
              </div>
            )}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { 
      id: '1',
      label: 'Learn HTML & CSS\n• HTML5 structure\n• CSS3 styling\n• Responsive design\n• CSS Grid & Flexbox', 
      isCompleted: false,
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { 
      id: '2',
      label: 'JavaScript Fundamentals\n• Core concepts\n• DOM manipulation\n• ES6+ features\n• Async programming', 
      isCompleted: false,
    },
    position: { x: 250, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { 
      id: '3',
      label: 'React Fundamentals\n• Components\n• State & Props\n• Hooks\n• React Router', 
      isCompleted: false,
    },
    position: { x: 250, y: 400 },
  },
];

// Helper function to generate consistent edge IDs
const getEdgeId = (source: string, target: string) => `e${source}-${target}`;

// Helper function to create an edge with validation
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

const defaultEdges: Edge[] = [
  createEdge('1', '2'),
  createEdge('2', '3'),
];

export default function DashboardPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleCareerSelect = useCallback((roadmapData: any[]) => {
    try {
      console.log('Received roadmap data in dashboard:', roadmapData);
      
      // Clear previous state
      setEdges([]);
      setNodes([]);

      // Create nodes with animation delays
      const newNodes = roadmapData.map((item: any, index: number) => ({
        id: item.id.toString(),
        type: 'custom',
        data: {
          id: item.id.toString(),
          label: item.label,
          isCompleted: false,
          shouldBeVisible: false,
          isTyping: false,
          animationDelay: index * 1500, // Increased delay between nodes
          onTypingComplete: () => handleTypingComplete(item.id.toString()),
        },
        position: item.position,
      }));

      // Set initial nodes
      setNodes(newNodes);

      // Show nodes one by one with animations
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

          // Create edge to previous node
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
          setTimeout(showNextNode, 2000); // Wait for typing animation to complete
        }
      };

      // Start showing nodes after a short delay
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
        // Check if edge already exists
        const exists = prevEdges.some(e => e.id === edge.id);
        if (exists) return prevEdges;
        
        // Add new edge
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

  // Initialize nodes with event handlers
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

      {/* Animation Styles */}
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
