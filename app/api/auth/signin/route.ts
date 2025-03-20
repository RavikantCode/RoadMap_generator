import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: "Please enter your email and password", success: false }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const userExist = await prisma.user.findUnique({ where: { email } });
        console.log(userExist);
        

        if (!userExist) {
            return new Response(
                JSON.stringify({ message: 'User does not exist with this email', success: false }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (!userExist.password) {
            return new Response(
                JSON.stringify({ message: 'Password is not set for this user', success: false }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {
            return new Response(
                JSON.stringify({ message: 'Invalid password', success: false }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Login successful', userId: userExist.id }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ message: 'Error occurred during login', success: false }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await prisma.$disconnect();
    }
}

