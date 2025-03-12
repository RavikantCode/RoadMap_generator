import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ success: false, message: 'Email and password are required.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return new Response(
                JSON.stringify({ success: false, message: "User already exists with this email" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: email.split('@')[0], // Temporary name from email
                role: 'BEGINNER'
            }
        });

        return new Response(
            JSON.stringify({ success: true, message: 'User registered successfully', userId: user.id }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Error occurred during registration' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await prisma.$disconnect();
    }
}