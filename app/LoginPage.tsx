// 'use client';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { gsap } from 'gsap';
// import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
// import Link from 'next/link';
// import { signIn } from 'next-auth/react';
// import axios from 'axios';

// const LoginPage: React.FC = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data: any) => {
//     try {
//       const res = await axios.post('/api/auth/signin', data);
//       if (res.data.success) {
//         // Redirect to dashboard or handle successful login
//         window.location.href = '/dashboard';
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'An unexpected error occurred.');
//     }
//   };

//   const handleGoogleSignIn = () => {
//     signIn('google', { callbackUrl: '/dashboard' });
//   };

//   React.useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from('.login-container', { 
//         opacity: 0, 
//         y: 30, 
//         duration: 0.8,
//         ease: 'power2.out'
//       });
//       gsap.from('.floating-cards', { 
//         opacity: 0, 
//         x: 30, 
//         duration: 0.8,
//         stagger: 0.1,
//         ease: 'power2.out'
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden antialiased">
//       {/* Static gradient background */}
//       <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-30" />
      
//       <div className="container mx-auto px-6 py-12 relative z-10">
//         {/* Navigation */}
//         <nav className="flex justify-between items-center mb-20">
         
//            <div className="flex items-center gap-2">
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   AI Mentor
//                 </h2>
//               </div>
//           <div className="flex items-center gap-6">
//             <Link 
//               href="/signup" 
//               className="text-gray-400 hover:text-white transition"
//             >
//               Sign up
//             </Link>
//           </div>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
//           {/* Login Form Side */}
//           <div className="login-container p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
//             <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Welcome back
//             </h2>
//             <p className="text-gray-400 mb-8">Continue your career journey</p>

//             <div className="space-y-6">
//               {/* Social Login Button - Only Google */}
//               <button
//                 type="button"
//                 onClick={handleGoogleSignIn}
//                 className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition duration-200"
//               >
//                 <FaGoogle className="text-lg text-white" />
//                 <span className="text-white">Continue with Google</span>
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-white/10"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-black text-gray-400">Or continue with</span>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-300">Email address</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                       <FaEnvelope className="text-gray-400" />
//                     </div>
//                     <input
//                       {...register('email')}
//                       className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
//                       type="email"
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-300">Password</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                       <FaLock className="text-gray-400" />
//                     </div>
//                     <input
//                       {...register('password')}
//                       className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
//                       type="password"
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
                
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium transition duration-200"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleSubmit(onSubmit)();
//                   }}
//                 >
//                   Sign in
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Decoration Side */}
//           <div className="hidden lg:block">
//             <div className="relative h-full">
//               <div className="floating-cards absolute top-0 left-0 w-64 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-12" />
//               <div className="floating-cards absolute top-20 right-0 w-72 h-56 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform rotate-12" />
//               <div className="floating-cards absolute bottom-0 left-20 w-80 h-60 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-6" />
              
//               <div className="absolute inset-0 flex items-center justify-center text-center z-10">
//                 <div className="space-y-6 p-8">
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     Start Your Journey
//                   </h2>
//                   <p className="text-gray-400 max-w-md">
//                     Log in to access your personalized career roadmap and continue your professional growth
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoginError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (result?.error) {
        setLoginError(result.error);
        return;
      }

      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (error: any) {
      setLoginError(error.message || 'An unexpected error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      setLoginError('Google sign-in failed');
    }
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.login-container', { 
        opacity: 0, 
        y: 30, 
        duration: 0.8,
        ease: 'power2.out'
      });
      gsap.from('.floating-cards', { 
        opacity: 0, 
        x: 30, 
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden antialiased">
      {/* Static gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-30" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Mentor
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/signup" 
              className="text-gray-400 hover:text-white transition"
            >
              Sign up
            </Link>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Login Form Side */}
          <div className="login-container p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back
            </h2>
            <p className="text-gray-400 mb-8">Continue your career journey</p>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-lg mb-4">
                {loginError}
              </div>
            )}

            <div className="space-y-6">
              {/* Social Login Button - Only Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition duration-200"
              >
                <FaGoogle className="text-lg text-white" />
                <span className="text-white">Continue with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium transition duration-200"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>

          {/* Decoration Side */}
          <div className="hidden lg:block">
            <div className="relative h-full">
              <div className="floating-cards absolute top-0 left-0 w-64 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-12" />
              <div className="floating-cards absolute top-20 right-0 w-72 h-56 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform rotate-12" />
              <div className="floating-cards absolute bottom-0 left-20 w-80 h-60 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-6" />
              
              <div className="absolute inset-0 flex items-center justify-center text-center z-10">
                <div className="space-y-6 p-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Start Your Journey
                  </h2>
                  <p className="text-gray-400 max-w-md">
                    Log in to access your personalized career roadmap and continue your professional growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
