//=============== dynamic correct    ===============================================================
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { IconEdit, IconCheck, IconX } from '@tabler/icons-react';
// import { useRoadmap } from '@/app/lib/auth/RoadmapContext';

// interface StepData {
//   id: string;
//   title?: string;
//   description?: string;
//   resources?: string[];
//   prerequisites?: string[];
//   nextSteps?: string;
//   label?: string;
// }

// export default function StepPage() {
//   const params = useParams();
//   const router = useRouter();
//   const stepId = params.id as string;
//   const { roadmapNodes } = useRoadmap();
  
//  
//   const nodeData = roadmapNodes.find((node: { id: string; }) => node.id === stepId);
  
// 
//   const [step, setStep] = useState<StepData>({
//     id: stepId,
//     title: '',
//     description: '',
//     resources: [],
//     prerequisites: [],
//     nextSteps: '',
//   });
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedStep, setEditedStep] = useState(step);

//   useEffect(() => {
//     if (nodeData) {
//       const newStep = {
//         id: stepId,
//         title: nodeData.data.label || 'Untitled Step',
//         description: nodeData.data.description || '',
//         resources: nodeData.data.resources || [],
//         prerequisites: nodeData.data.prerequisites || [],
//         nextSteps: nodeData.data.nextSteps || '',
//       };
//       setStep(newStep);
//       setEditedStep(newStep);
//     }
//   }, [nodeData, stepId]);

//   if (!nodeData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-white mb-4">Step not found</h1>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="text-blue-400 hover:text-blue-300 transition-colors"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = () => {
//     setStep(editedStep);
//     setIsEditing(false);
    
// 
//     console.log('Saving changes:', editedStep);
//   };

//   const handleCancel = () => {
//     setEditedStep(step);
//     setIsEditing(false);
//   };

//   const findAdjacentNodes = () => {
//     const nodeIds = roadmapNodes.map((node: { id: any; }) => node.id);
//     const currentIndex = nodeIds.indexOf(stepId);
    
//     const prevNodeId = currentIndex > 0 ? nodeIds[currentIndex - 1] : null;
//     const nextNodeId = currentIndex < nodeIds.length - 1 ? nodeIds[currentIndex + 1] : null;
    
//     return { prevNodeId, nextNodeId };
//   };

//   const { prevNodeId, nextNodeId } = findAdjacentNodes();

//   return (
//     <div className="min-h-screen relative py-8 px-4 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
//       <div className="max-w-3xl mx-auto relative z-10">
//         <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
//           <div className="p-6 space-y-6">
//             <div className="flex justify-between items-center">
//               <div className="flex-1">
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={editedStep.title}
//                     onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
//                     className="text-3xl font-bold w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
//                   />
//                 ) : (
//                   <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
//                     {step.title}
//                   </h1>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 {isEditing ? (
//                   <>
//                     <button
//                       onClick={handleSave}
//                       className="text-green-400 hover:text-green-300 p-2 hover:bg-green-400/10 rounded-xl transition-all"
//                     >
//                       <IconCheck size={24} />
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
//                     >
//                       <IconX size={24} />
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-400/10 rounded-xl transition-all"
//                   >
//                     <IconEdit size={24} />
//                   </button>
//                 )}
//                 <button
//                   onClick={() => router.push('/dashboard')}
//                   className="text-gray-400 hover:text-white px-4 py-2 rounded-xl transition-all hover:bg-white/5"
//                 >
//                   Back to Dashboard
//                 </button>
//               </div>
//             </div>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
//               {isEditing ? (
//                 <textarea
//                   value={editedStep.description}
//                   onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
//                   rows={4}
//                 />
//               ) : (
//                 <p className="text-gray-300 leading-relaxed">{step.description}</p>
//               )}
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Resources</h2>
//               {isEditing ? (
//                 <div className="space-y-2">
//                   {editedStep.resources?.map((resource, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={resource}
//                         onChange={(e) => {
//                           const newResources = [...(editedStep.resources || [])];
//                           newResources[idx] = e.target.value;
//                           setEditedStep({ ...editedStep, resources: newResources });
//                         }}
//                         className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
//                       />
//                       <button
//                         onClick={() => {
//                           const newResources = editedStep.resources?.filter((_, i) => i !== idx);
//                           setEditedStep({ ...editedStep, resources: newResources });
//                         }}
//                         className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
//                       >
//                         <IconX size={20} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => {
//                       const newResources = [...(editedStep.resources || []), ''];
//                       setEditedStep({ ...editedStep, resources: newResources });
//                     }}
//                     className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
//                   >
//                     + Add Resource
//                   </button>
//                 </div>
//               ) : (
//                 <ul className="space-y-2">
//                   {step.resources && step.resources.length > 0 ? (
//                     step.resources.map((resource, idx) => (
//                       <li key={idx}>
//                         <a
//                           href={resource.startsWith('http') ? resource : `https://${resource}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-300 hover:underline"
//                         >
//                           {resource}
//                         </a>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-gray-400">No resources available</li>
//                   )}
//                 </ul>
//               )}
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Prerequisites</h2>
//               {isEditing ? (
//                 <div className="space-y-2">
//                   {editedStep.prerequisites?.map((prereq, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={prereq}
//                         onChange={(e) => {
//                           const newPrereqs = [...(editedStep.prerequisites || [])];
//                           newPrereqs[idx] = e.target.value;
//                           setEditedStep({ ...editedStep, prerequisites: newPrereqs });
//                         }}
//                         className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
//                       />
//                       <button
//                         onClick={() => {
//                           const newPrereqs = editedStep.prerequisites?.filter((_, i) => i !== idx);
//                           setEditedStep({ ...editedStep, prerequisites: newPrereqs });
//                         }}
//                         className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-xl transition-all"
//                       >
//                         <IconX size={20} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => {
//                       const newPrereqs = [...(editedStep.prerequisites || []), ''];
//                       setEditedStep({ ...editedStep, prerequisites: newPrereqs });
//                     }}
//                     className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
//                   >
//                     + Add Prerequisite
//                   </button>
//                 </div>
//               ) : (
//                 <ul className="space-y-2">
//                   {step.prerequisites && step.prerequisites.length > 0 ? (
//                     step.prerequisites.map((prereq, idx) => (
//                       <li key={idx} className="text-gray-300">
//                         {prereq}
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-gray-400">No prerequisites specified</li>
//                   )}
//                 </ul>
//               )}
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
//               {isEditing ? (
//                 <textarea
//                   value={editedStep.nextSteps}
//                   onChange={(e) => setEditedStep({ ...editedStep, nextSteps: e.target.value })}
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
//                   rows={3}
//                 />
//               ) : (
//                 <p className="text-gray-300 leading-relaxed">
//                   {step.nextSteps || "No next steps defined yet."}
//                 </p>
//               )}
//             </section>

//             <div className="pt-4 border-t border-white/10 flex justify-between">
//               {prevNodeId && (
//                 <button
//                   onClick={() => router.push(`/roadmap/step/${prevNodeId}`)}
//                   className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   Previous Step
//                 </button>
//               )}
              
//               {nextNodeId && (
//                 <button
//                   onClick={() => router.push(`/roadmap/step/${nextNodeId}`)}
//                   className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors ml-auto"
//                 >
//                   Next Step
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//================================================================================================

// 'use client';

// import { useRoadmap } from '@/app/lib/auth/RoadmapContext';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';


// export default function StepPage() {
//   const params = useParams();
//   const router = useRouter();
//   const stepId = params.id as string;

//   const { roadmapNodes } = useRoadmap();
//   const [step, setStep] = useState<any | null>(null);

//   useEffect(() => {
//     const node = roadmapNodes.find((node: any) => node.id === stepId);
//     if (node) {
//       setStep(node);
//     } else {
//       setStep(null);
//     }
//   }, [stepId, roadmapNodes]);

//   if (!step) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-white mb-4">Step not found</h1>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="text-blue-400 hover:text-blue-300 transition-colors"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { data } = step;
//   const { label } = data;

//   const [title, ...rest] = label.split('\n');
//   const timeline = rest.pop(); 
//   const description = rest.join('\n'); 

//   return (
//     <div className="min-h-screen relative py-8 px-4 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

//       <div className="max-w-3xl mx-auto relative z-10">
//         <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
//           <div className="p-6 space-y-6">
//             <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
//               {title}
//             </h1>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
//               <p className="text-gray-300 leading-relaxed">{description}</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-white mb-3">Timeline</h2>
//               <p className="text-gray-300">{timeline}</p>
//             </section>
//           </div>

//           <div className="border-t border-white/10 px-6 py-4 bg-white/5">
//             <button
//               onClick={() => router.push('/dashboard')}
//               className="text-gray-400 hover:text-white px-4 py-2 rounded-xl transition-all hover:bg-white/5"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { useRoadmap } from '@/app/lib/auth/RoadmapContext';

interface StepData {
  id: string;
  title?: string;
  description?: string;
  resources?: string[];
  prerequisites?: string[];
  nextSteps?: string;
  label?: string;
  timeline?: string; 
}

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const stepId = params.id as string;
  const { roadmapNodes } = useRoadmap();

  const [step, setStep] = useState<StepData | null>(null);
  const [prevNodeId, setPrevNodeId] = useState<string | null>(null);
  const [nextNodeId, setNextNodeId] = useState<string | null>(null);
  const [nextStep, setNextStep] = useState<StepData | null>(null);

 
  useEffect(() => {
    const currentIndex = roadmapNodes.findIndex((node: { id: string }) => node.id === stepId);
    if (currentIndex !== -1) {
      const currentNode = roadmapNodes[currentIndex];
      setStep({
        id: currentNode.id,
        title: currentNode.data.label || 'Untitled Step',
        description: currentNode.data.description || '',
        resources: currentNode.data.resources || [],
        prerequisites: currentNode.data.prerequisites || [],
        nextSteps: currentNode.data.nextSteps || '',
        timeline: currentNode.data.timeline || 'Not specified',
      });

      setPrevNodeId(currentIndex > 0 ? roadmapNodes[currentIndex - 1].id : null);
      const nextNode = currentIndex < roadmapNodes.length - 1 ? roadmapNodes[currentIndex + 1] : null;
      setNextNodeId(nextNode?.id || null);
      setNextStep(nextNode ? {
        id: nextNode.id,
        title: nextNode.data.label || 'Untitled Step',
        description: nextNode.data.description || '',
        timeline: nextNode.data.timeline || 'Not specified',
      } : null);
    } else {
      setStep(null);
    }
  }, [stepId, roadmapNodes]);

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

  const googleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const youtubeSearch = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="min-h-screen relative py-8 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-6 space-y-6">
            <section>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {step.title}
              </h1>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => googleSearch(step.title || '')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Search on Google
                </button>
                <button
                  onClick={() => youtubeSearch(step.title || '')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Search on YouTube
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Timeline</h2>
              <p className="text-gray-300">{step.timeline}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Prerequisites</h2>
              <ul className="space-y-2">
                {step.prerequisites && step.prerequisites.length > 0 ? (
                  step.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      {prereq}
                      <button
                        onClick={() => googleSearch(prereq)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <IconSearch size={16} />
                      </button>
                      <button
                        onClick={() => youtubeSearch(prereq)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <IconSearch size={16} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No prerequisites specified</li>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Resources</h2>
              <ul className="space-y-2">
                {step.resources && step.resources.length > 0 ? (
                  step.resources.map((resource, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <a
                        href={resource.startsWith('http') ? resource : `https://${resource}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {resource}
                      </a>
                      <button
                        onClick={() => googleSearch(resource)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <IconSearch size={16} />
                      </button>
                      <button
                        onClick={() => youtubeSearch(resource)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <IconSearch size={16} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No resources available</li>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
              {nextStep ? (
                <div>
                  <h3 className="text-lg font-bold text-gray-300">{nextStep.title}</h3>
                  <p className="text-gray-300">{nextStep.description}</p>
                 
                </div>
              ) : (
                <p className="text-gray-400">No next steps defined yet.</p>
              )}
            </section>
          </div>

          <div className="border-t border-white/10 px-6 py-4 bg-white/5 flex justify-between">
            {prevNodeId && (
              <button
                onClick={() => router.push(`/roadmap/step/${prevNodeId}`)}
                className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10"
              >
                ← Previous Step
              </button>
            )}
            {nextNodeId && (
              <button
                onClick={() => router.push(`/roadmap/step/${nextNodeId}`)}
                className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all hover:bg-blue-400/10 ml-auto"
              >
                Next Step →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}