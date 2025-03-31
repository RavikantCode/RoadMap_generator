// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';



// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { userId, education, certifications, interests, skills, projects } = req.body;

    
//       if (!userId || !education || !certifications || !interests || !skills || !projects) {
//         return res.status(400).json({ error: 'Invalid data format' });
//       }

//       const profile = await prisma.user.update({
//         where: { id: userId },
//         data: {
//           academics: {
//             upsert: {
//               create: {
//                 marks_10th_percentage: education.marks_10th_percentage,
//                 marks_12th_percentage: education.marks_12th_percentage,
//                 college_cgpa: education.college_cgpa,
//                 degree: education.degree,
//                 branch: education.branch,
//               },
//               update: {
//                 marks_10th_percentage: education.marks_10th_percentage,
//                 marks_12th_percentage: education.marks_12th_percentage,
//                 college_cgpa: education.college_cgpa,
//                 degree: education.degree,
//                 branch: education.branch,
//               },
//             },
//           },
//           certification: {
          
//             create: certifications.map((cert: any) => ({
//               certificate_name: cert.name,
//               platform: cert.issuer,
//               issued_at: new Date(cert.date),
//             })),
//           },
//           interest: {
          
//             create: interests.map((interest: string) => ({
//               interest,
//             })),
//           },
//           jobs: {
//             deleteMany: {},
//             create: projects.map((project: any) => ({
//               job_title: project.name,
//               company_name: project.description,
//               salary_range: project.url || '',
//               posted_at: new Date(),
//             })),
//           },
//           skills: {
//             upsert: {
//               create: {
//                 technical: skills.technical,
//                 soft: skills.soft,
//               },
//               update: {
//                 technical: skills.technical,
//                 soft: skills.soft,
//               },
//             },
//           },
//         },
//       });

//       res.status(200).json({ message: 'Profile saved successfully', profile });
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }



//======================================


// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Received request body:", body);

//     const { email, education, certifications, interests, skills, projects } = body;

//  
//     if (!email || !education || !certifications || !interests || !skills || !projects) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//  
//     const parsedEducation = {
//       marks_10th_percentage: parseFloat(education.tenthMarks),
//       marks_12th_percentage: parseFloat(education.twelfthMarks),
//       college_cgpa: parseFloat(education.currentCGPA),
//       degree: education.degree,
//       branch: education.tenthBoard,
//     };

//  
//     const parsedCertifications = certifications.map((cert: any) => ({
//       certificate_name: cert.name,
//       platform: cert.issuer,
//       issued_at: new Date(cert.date),
//     }));

//   
//     const parsedProjects = projects.map((project: any) => ({
//       job_title: project.name,
//       company_name: project.description,
//       salary_range: project.techStack?.join(', ') || '', 
//     }));

//   
//     const userExists = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!userExists) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const userId = userExists.id;

//    
//     const profile = await prisma.$transaction(async (tx) => {
//     
//       const academics = await tx.uSER_ACADEMICS_DETAILS.upsert({
//         where: { user_id: userId },
//         create: {
//           user_id: userId,
//           ...parsedEducation,
//         },
//         update: {
//           ...parsedEducation,
//         },
//       });

//     
//       const skillsData = await tx.skills.upsert({
//         where: { user_id: userId },
//         create: {
//           user_id: userId,
//           technical: skills.technical,
//           soft: skills.soft,
//         },
//         update: {
//           technical: skills.technical,
//           soft: skills.soft,
//         },
//       });

//     
//       await tx.uSER_CERTIFICATION.deleteMany({
//         where: { user_id: userId },
//       });

//       await tx.uSER_INTEREST.deleteMany({
//         where: { user_id: userId },
//       });

//      
//       const certData = await Promise.all(
//         parsedCertifications.map((cert: any) =>
//           tx.uSER_CERTIFICATION.create({
//             data: {
//               user_id: userId,
//               ...cert,
//             },
//           })
//         )
//       );

//      
//       const interestData = await Promise.all(
//         interests.map((interest: any) =>
//           tx.uSER_INTEREST.create({
//             data: {
//               user_id: userId,
//               interest: interest,
//             },
//           })
//         )
//       );

//     
//       await tx.job.deleteMany({
//         where: { user_id: userId },
//       });

//     
//       const jobsData = await Promise.all(
//         parsedProjects.map((project: any) =>
//           tx.job.create({
//             data: {
//               user_id: userId,
//               ...project,
//               posted_at: new Date(),
//             },
//           })
//         )
//       );

//       return {
//         academics,
//         skills: skillsData,
//         certifications: certData,
//         interests: interestData,
//         jobs: jobsData,
//       };
//     });

//     return NextResponse.json({
//       message: 'Profile saved successfully',
//       profile,
//     });
//   } catch (error: any) {
//     console.error('Error saving profile:', error.stack || error);
//     return NextResponse.json(
//       {
//         error: `Internal Server Error: ${error.message || 'Unknown error'}`,
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

//======================================================================


import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { email, education, certifications, interests, skills, projects } = body;

    if (!email || !education || !certifications || !interests || !skills || !projects) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parsedEducation = {
      marks_10th_percentage: parseFloat(education.tenthMarks),
      marks_12th_percentage: parseFloat(education.twelfthMarks),
      college_cgpa: parseFloat(education.currentCGPA),
      degree: education.degree,
      branch: education.tenthBoard,
    };

    const parsedCertifications = certifications.map((cert: any) => ({
      certificate_name: cert.name,
      platform: cert.issuer,
      issued_at: new Date(cert.date),
    }));

    const parsedProjects = projects.map((project: any) => ({
      job_title: project.name,
      company_name: project.description,
      salary_range: project.techStack?.join(', ') || '',
    }));

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userExists.id;

    const academics = await prisma.uSER_ACADEMICS_DETAILS.upsert({
      where: { user_id: userId },
      create: {
        user_id: userId,
        ...parsedEducation,
      },
      update: {
        ...parsedEducation,
      },
    });

    const skillsData = await prisma.skills.upsert({
      where: { user_id: userId },
      create: {
        user_id: userId,
        technical: skills.technical,
        soft: skills.soft,
      },
      update: {
        technical: skills.technical,
        soft: skills.soft,
      },
    });

    await prisma.uSER_CERTIFICATION.deleteMany({ where: { user_id: userId } });
    await prisma.uSER_INTEREST.deleteMany({ where: { user_id: userId } });

    const certData = await Promise.all(
      parsedCertifications.map((cert: any) =>
        prisma.uSER_CERTIFICATION.create({ data: { user_id: userId, ...cert } })
      )
    );

    const interestData = await Promise.all(
      interests.map((interest: any) =>
        prisma.uSER_INTEREST.create({ data: { user_id: userId, interest } })
      )
    );

    await prisma.job.deleteMany({ where: { user_id: userId } });

    const jobsData = await Promise.all(
      parsedProjects.map((project: any) =>
        prisma.job.create({
          data: {
            user_id: userId,
            ...project,
            posted_at: new Date(),
          },
        })
      )
    );

    return NextResponse.json({
      message: 'Profile saved successfully',
      profile: {
        academics,
        skills: skillsData,
        certifications: certData,
        interests: interestData,
        jobs: jobsData,
      },
    });
  } catch (error: any) {
    console.error('Error saving profile:', error.stack || error);
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error.message || 'Unknown error'}`,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}