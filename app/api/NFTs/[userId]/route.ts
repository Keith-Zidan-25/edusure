import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/database";
import { getNftInfo } from "../../../../utils/functions/NFTFunctions";
import { User } from "../../../../model/User";
import { Credential } from "../../../../utils/types/credentials";
import moment from "moment";
import { NFTInfo } from "../../../../utils/types/credentials";

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
