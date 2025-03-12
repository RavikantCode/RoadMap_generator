'use client';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import axios from "axios";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/api/auth/signup', data);
      if (res.data.success) {
        router.push('/dashboard');
      } else {
        alert(res.data.message);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden antialiased">
      {/* Static gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-30" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Mentor
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-gray-400 hover:text-white transition">
              Sign in
            </Link>
          </div>
        </nav>

        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 mb-8">Start your career journey</p>

            <div className="space-y-6">
              {/* Google Sign-in */}
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
                  <span className="px-2 bg-black text-gray-400">Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      placeholder="Create a password"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">{String(errors.password.message)}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium transition duration-200"
                >
                  Create Account
                </button>
              </form>

              <p className="text-gray-400 text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
