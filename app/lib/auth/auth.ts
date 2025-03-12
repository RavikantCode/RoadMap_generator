
//==================================================================================================================

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({   
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    // Find existing user
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    // If user doesn't exist, throw error
                    if (!existingUser) {
                        throw new Error('No user found with this email');
                    }

                    // Check if password exists (might be null for OAuth users)
                    if (!existingUser.password) {
                        throw new Error('Password not set for this account');
                    }

                    // Compare passwords with bcrypt
                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        existingUser.password
                    );

                    // If passwords don't match, throw error
                    if (!passwordMatch) {
                        throw new Error('Incorrect password');
                    }

                    // Return user data
                    return {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role
                    };
                } catch (error: any) {
                    console.error("Authorization error:", error);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }: any) {
            if (account.provider === 'google') {
                // Check if the user already exists
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: user.email
                    }
                });
                
                // If they don't exist, create a user without password
                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            // No password needed for Google users
                        }
                    });
                }
            }
            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session && session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",  // Changed from "/signup" to "/login"
    },
    // Add error handling for authentication
};