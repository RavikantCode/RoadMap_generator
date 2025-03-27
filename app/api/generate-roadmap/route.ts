// import axios from 'axios';
// import { NextResponse } from 'next/server';

// async function getRoadmap(data: any) {
//     try {
//         const formattedData = {
//             skills: [],
//             experience_level: "Beginner",
//             interests: [data.userInput],
//             career_path: "",
//             learning_preference: "Course-based",
//             degree: "",
//             branch: "",
//             certifications: ["", "", ""]
//         };

//         const response = await axios.post('http://127.0.0.1:8000/generate_roadmap', formattedData);
    
     
//         const stepColors = [
//             { bg: '#e3f2fd', border: '#2196f3' }, 
//             { bg: '#f3e5f5', border: '#9c27b0' },
//             { bg: '#e8f5e9', border: '#4caf50' },
//             { bg: '#fff3e0', border: '#ff9800' }, 
//             { bg: '#f3e5f5', border: '#9c27b0' }  
//         ];

       
//         const roadmapData = response.data.combined.roadmap.map((step: any, index: number) => ({
//             id: (index + 1).toString(),
//             type: 'custom',
//             position: { x: 250, y: index * 200 },
//             data: { 
//                 id: (index + 1).toString(),
//                 label: `Step ${index + 1}: ${step.title}\n${step.description || 'No description available'}`
//             },
//             style: {
//                 background: stepColors[index % stepColors.length].bg,
//                 color: '#000000',
//                 padding: '20px',
//                 border: `2px solid ${stepColors[index % stepColors.length].border}`,
//                 borderRadius: '8px',
//                 width: 300,
//                 fontSize: '14px',
//                 textAlign: 'left',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }
//         }));

//         const projectStartY = (roadmapData.length * 200) + 100;

  
//         const projectNodes = response.data.combined.projects.map((project: any, index: number) => ({
//             id: `project-${index + 1}`,
//             type: 'custom',
//             position: { x: 250, y: (roadmapData.length + index) * 200 + 100 },
//             data: { 
//                 id: `project-${index + 1}`,
//                 label: `Project: ${project.name}\n${project.description || 'No description available'}`
//             },
//             style: {
//                 background: '#fff8e1', 
//                 color: '#000000',
//                 padding: '20px',
//                 border: '2px solid #ffc107',
//                 borderRadius: '8px',
//                 width: 300,
//                 fontSize: '14px',
//                 textAlign: 'left',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }
//         }));

//         return [...roadmapData, ...projectNodes];

//     } catch (error) {
//         console.error("Error in getRoadmap:", error);
//         if (axios.isAxiosError(error) && error.response) {
//             console.error("Response data:", error.response.data);
//             throw new Error(`API Error: ${error.response.data.detail || error.message}`);
//         }
//         throw error;
//     }
// }

// export async function POST(req: Request) {
//     try {
//         const data = await req.json();
        
//         if (!data || !data.userInput) {
//             return NextResponse.json(
//                 { error: "User input is required" },
//                 { status: 400 }
//             );
//         }

//         const nodes = await getRoadmap(data);
//         return NextResponse.json(nodes);
        
//     } catch (error) {
//         console.error("API Route Error:", error);
//         return NextResponse.json(
//             { error: error instanceof Error ? error.message : "Failed to process request" },
//             { status: 500 }
//         );
//     }
// }


import axios from 'axios';
import { NextResponse } from 'next/server';

async function getRoadmap(data: any) {
    try {
      
        const formattedData = {
            skills: data.skills || [],
            experience_level: data.experience_level || "Beginner",
            interests: [data.userInput], 
            career_path: data.career_path || data.userInput, 
            learning_preference: data.learning_preference || "Course-based",
            degree: data.degree || "",
            branch: data.branch || "",
            certifications: data.certifications || []
        };

     
        const response = await axios.post('http://127.0.0.1:8000/generate_roadmap', formattedData);

       
        const stepColors = [
            { bg: '#e3f2fd', border: '#2196f3' },
            { bg: '#f3e5f5', border: '#9c27b0' },
            { bg: '#e8f5e9', border: '#4caf50' },
            { bg: '#fff3e0', border: '#ff9800' },
            { bg: '#f3e5f5', border: '#9c27b0' }
        ];

      
        const roadmapData = response.data.combined.roadmap.map((step: any, index: number) => ({
            id: (index + 1).toString(),
            type: 'custom',
            position: { x: 250, y: index * 200 },
            data: {
                id: (index + 1).toString(),
                label: `Step ${index + 1}: ${step.title}\n${step.description || 'No description available'}\nTimeline: ${step.timeline || 'Not specified'}`
            },
            style: {
                background: stepColors[index % stepColors.length].bg,
                color: '#000000',
                padding: '20px',
                border: `2px solid ${stepColors[index % stepColors.length].border}`,
                borderRadius: '8px',
                width: 300,
                fontSize: '14px',
                textAlign: 'left',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }
        }));

     
        const projectStartY = (roadmapData.length * 200) + 100;
        const projectNodes = response.data.combined.projects.map((project: any, index: number) => ({
            id: `project-${index + 1}`,
            type: 'custom',
            position: { x: 250, y: (roadmapData.length + index) * 200 + 100 },
            data: {
                id: `project-${index + 1}`,
                label: `Project: ${project.name}\n${project.description || 'No description available'}\nTechnologies: ${project.technologies.join(', ')}`
            },
            style: {
                background: '#fff8e1',
                color: '#000000',
                padding: '20px',
                border: '2px solid #ffc107',
                borderRadius: '8px',
                width: 300,
                fontSize: '14px',
                textAlign: 'left',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }
        }));

        return [...roadmapData, ...projectNodes];
    } catch (error) {
        console.error("Error in getRoadmap:", error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Response data:", error.response.data);
                throw new Error(`API Error: ${error.response.data.detail || error.message}`);
            } else if (error.request) {
                throw new Error("No response received from the roadmap generation API");
            }
        }
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data || (!data.userInput && !data.career_path)) {
            return NextResponse.json(
                { error: "Either userInput or career_path is required" },
                { status: 400 }
            );
        }

    
        const nodes = await getRoadmap(data);
        return NextResponse.json(nodes);
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : "Failed to process request",
                details: error instanceof Error ? error.toString() : "Unknown error"
            },
            { status: 500 }
        );
    }
}