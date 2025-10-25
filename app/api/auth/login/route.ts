import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { User } from "@/model/User";

await dbConnect();
//SignIn function
export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }
        const user = await User.findOne({ email, password });
        console.log(user);
        
        if (!user || !user.password === password) {
            return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
        }

        return NextResponse.json({ id: user._id, name: user.username, hederaAccountId: user.hederaAccountId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error signing in", error }, { status: 500 });
    }
}