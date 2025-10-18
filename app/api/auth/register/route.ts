import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { User } from "@/model/User";

await dbConnect();

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
        const { hederaAccountId, hederaPrivateKey, hederaPublicKey } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createChainAcc`)).json();
        const newUser = new User({ username, email, password, hederaAccountId, hederaPrivateKey, hederaPublicKey });
        await newUser.save();

        return NextResponse.json({ id: newUser._id, username, hederaAccountId }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error signing up", error }, { status: 500 });
    }
}