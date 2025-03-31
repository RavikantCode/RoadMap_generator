'use client';

import React, { useState } from 'react';
import EducationForm from './EducationForm';
import CertificationsForm from './CertificationsForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import { useSession } from 'next-auth/react';

interface Education {
  tenthBoard: string;
  tenthMarks: number;
  twelfthBoard: string;
  twelfthMarks: number;
  degree?: string;
  branch?: string;
  currentCGPA?: number;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface Project {
  name: string;
  description: string;
  techStack: string[];
  url?: string;
}

interface ProfileData {
  education: Education;
  certifications: Certification[];
  skills: {
    technical: string[];
    soft: string[];
  };
  interests: string[];
  projects: Project[];
}

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>({
    education: {
      tenthBoard: '',
      tenthMarks: 0,
      twelfthBoard: '',
      twelfthMarks: 0,
    },
    certifications: [],
    skills: {
      technical: [],
      soft: [],
    },
    interests: [],
    projects: [],
  });
  console.log(formData);

  //============================== added to get session 

  const {data:session} = useSession();
  console.log(session);
  
  //============================ 
  

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleCertificationAdd = (cert: Certification) => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, cert],
    });
  };

  const handleCertificationRemove = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleSkillsChange = (skills: { technical: string[]; soft: string[] }) => {
    setFormData({
      ...formData,
      skills,
    });
  };

  const handleInterestsChange = (interests: string[]) => {
    setFormData({
      ...formData,
      interests,
    });
  };

  const handleProjectAdd = (project: Project) => {
 
    const newProject = {


      name: project.name,
      description: project.description,
      techStack: [...project.techStack], 
      url: project.url
    };
    
   
    setFormData(prevData => ({
      ...prevData,
      projects: [...prevData.projects, newProject]
    }));
  };

  const handleProjectRemove = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      projects: prevData.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
   
  
   
    // const userId = session?.user?.id;
    

    if (!session || !session.user || !session.user.email) {
      alert('User is not logged in or email is missing');
      return;
    }

    // const transformedData = {
    //   userId: userId,
    //   education: {
    //     marks_10th_percentage: formData.education.tenthMarks,
    //     marks_12th_percentage: formData.education.twelfthMarks,
    //     college_cgpa: formData.education.currentCGPA ? formData.education.currentCGPA : null,
    //     degree: formData.education.degree || '',
    //     branch: formData.education.branch || '',
    //   },
    //   certifications: formData.certifications.map(cert => ({
    //     certificate_name: cert.name,
    //     platform: cert.issuer,
    //     issued_at: cert.date,
    //   })),
    //   interests: formData.interests,
    //   skills: {
    //     technical: formData.skills.technical,
    //     soft: formData.skills.soft,
    //   },
    //   projects: formData.projects.map(project => ({
    //     job_title: project.name,
    //     company_name: project.description,
    //     salary_range: project.url || '',
    //   })),
    // };
  
    console.log('Sending profile data:', );
  
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,            //added email to insert in db--prisma
          education: formData.education,
          certifications: formData.certifications,
          interests: formData.interests,
          skills: formData.skills,
          projects: formData.projects,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile');
      }
  
      const result = await response.json();
      alert('Profile saved successfully!');
      console.log('Saved Profile:', result.profile);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(`Failed to save profile: ${(error as Error).message}`);
    }
  };

  const steps = [
    {
      title: 'Education',
      component: (
        <EducationForm
          education={formData.education}
          onChange={handleEducationChange}
        />
      ),
    },
    {
      title: 'Certifications',
      component: (
        <CertificationsForm
          certifications={formData.certifications}
          onAdd={handleCertificationAdd}
          onRemove={handleCertificationRemove}
        />
      ),
    },
    {
      title: 'Skills & Interests',
      component: (
        <SkillsForm
          skills={formData.skills}
          interests={formData.interests}
          onSkillsChange={handleSkillsChange}
          onInterestsChange={handleInterestsChange}
        />
      ),
    },
    {
      title: 'Projects',
      component: (
        <ProjectsForm
          projects={formData.projects}
          onAdd={handleProjectAdd}
          onRemove={handleProjectRemove}
        />
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Complete Your Profile
        </h1>
        <p className="text-gray-400 mt-2">Build your professional profile to get personalized roadmap recommendations</p>
      </div>


      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep > index + 1
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'bg-white/5'
                }`}
              />
            )}
          </div>
        ))}
      </div>

     
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        {steps[currentStep - 1].component}

      
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => {
              if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
              } else {
                handleSubmit();
              }
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {currentStep === steps.length ? 'Save Profile' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
