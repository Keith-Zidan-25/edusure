import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { AccountId } from "@hashgraph/sdk";
import { User } from "@/model/User";

async function getNftInfo(accountId: string | AccountId) {
    const nftInfo = await fetch(`${process.env.MIRROR_NODE_API}/accounts/${accountId}/nfts?limit=100`, { method: "GET" });
    const nftInfoJson = await nftInfo.json();
    const nftInfos = [...nftInfoJson.nfts];
    let nextLink = nftInfoJson.links.next;
    
    while (nextLink !== null) {
        const nextNftInfo = await fetch(`${process.env.MIRROR_NODE_API}${nextLink}`, { method: "GET" });
        const nextNftInfoJson = await nextNftInfo.json();
        
        nftInfos.push(...nextNftInfoJson.nfts);
        nextLink = nextNftInfoJson.links.next;
    }
    
    return nftInfos;
}

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const userId = request.nextUrl.searchParams.get("userId");
        
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }
        const user = await User.findOne({ _id: userId}).select("hederaAccountId");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const nftInfos = await getNftInfo(user.hederaAccountId);

        return NextResponse.json({ message: "NFTs retrieved successfully", nfts: nftInfos }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving NFTs", error }, { status: 500 });
    }
}
