import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { AccountId } from "@hashgraph/sdk";
import { User } from "@/model/User";
import { Credential } from "@/utils/types/credentials";
import moment from "moment";

interface NFTInfo {
    created_timestamp: string;
    metadata: string;
    token_id: string;
    serial_number: number;
    account_id: string;
    deleted: boolean;
    spender_id: string | null;
}

async function dataCleaner(nftInfos: NFTInfo[]) {
    const cleanedData: Credential[] = [];
    for (const nftInfo of nftInfos) {
        const temp = {
            title: "",
            issuer: "",
            date: "",
            type: "Certificate",
            verified: true,
            imageUrl: Buffer.from(nftInfo.metadata, "base64").toString("utf8"),
            hash: nftInfo.metadata,
            status: "Verified",
            credentialId: `${nftInfo.token_id}\\${nftInfo.serial_number}`
        };
        if (nftInfo.hasOwnProperty("created_timestamp")) {
            temp["date"] = moment.unix(parseInt(nftInfo["created_timestamp"].split(".")[0])).format("DD MM YYYY");
        }

        if (nftInfo.hasOwnProperty("token_id")) {
            const tokenProperties = await fetch(`${process.env.MIRROR_NODE_API}/tokens/${nftInfo["token_id"]}`, { method: "GET" });
            const tokenPropertiesJson = await tokenProperties.json();
            
            if (tokenPropertiesJson.hasOwnProperty("name")) {
                temp["title"] = tokenPropertiesJson["name"];
            }
            if (tokenPropertiesJson.hasOwnProperty("treasury_account_id")) {
                temp["issuer"] = tokenPropertiesJson["treasury_account_id"];
            }
        }

        cleanedData.push(temp);
    }

    return cleanedData;
}

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

export async function GET(request: NextRequest, { params }: { params: { userId: string }}) {
    try {
        await dbConnect();
        const { userId } = await params;
        
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }
        const user = await User.findOne({ _id: userId }).select("hederaAccountId");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const nftInfos = await getNftInfo(user.hederaAccountId);
        const cleanedNftInfos = await dataCleaner(nftInfos);
        
        return NextResponse.json({ message: "NFTs retrieved successfully", nfts: cleanedNftInfos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving NFTs", error }, { status: 500 });
    }
}
