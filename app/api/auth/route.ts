import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { User } from "@/model/User";

await dbConnect();
//SignIn function
export async function GET(request: NextRequest) {
    try {
        const {username, password} = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }
        const user = await User.findOne({ username, password });
        
        if (!user || !user.password === password) {
            return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Sign in successful", userId: user._id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error signing in", error }, { status: 500 });
    }
}

//SignUp function
export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 });
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        
        if (existingUser) {
            return NextResponse.json({ message: "Username or email already exists" }, { status: 409 });
        }
        const {hederaAccountId, hederaPrivateKey, hederaPublicKey } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createChainAcc`)).json();
        const newUser = new User({ username, email, password, hederaAccountId, hederaPrivateKey, hederaPublicKey });
        await newUser.save();

        return NextResponse.json({ message: "Sign up successful", userId: newUser._id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error signing up", error }, { status: 500 });
    }
}