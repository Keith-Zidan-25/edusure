import { NextRequest, NextResponse } from "next/server";
import { getNftInfo } from "../../../../utils/functions/NFTFunctions";
import { NFTInfo } from "../../../../utils/types/credentials";

async function findNFTinList(nfts: NFTInfo[], tokenId: string) {
    for (const nft of nfts) {
        if (nft.token_id === tokenId) {
            return true;
        }
    }

    return false;
}

export async function POST(request: NextRequest) {
    try {
        const {hederaAccountId, tokenId} = await request.json();

        if (!hederaAccountId || !tokenId) {
            return NextResponse.json({ message: "Missing necessary data for validation", isValid: false }, { status: 404 });
        }
        const validateToken = await (await fetch(`${process.env.MIRROR_NODE_API}/tokens/${tokenId}`)).json();

        if (validateToken?._status && !validateToken?.admin_key) {
            return NextResponse.json({ message: validateToken?._status.messages[0].message, isValid: false }, { status: 200 });
        }
        const nftlist = await getNftInfo(hederaAccountId);

        if (!nftlist) {
            return NextResponse.json({ message: "Token exists but not associated with your account", isValid: false }, { status: 200 });
        }
        const result = await findNFTinList(nftlist, tokenId);
        const finalMessage = result ? 
            `Successfully Verified!\nToken ${tokenId} exists and associated with your account` :
            `Verfication partially successfull,\nToken ${tokenId} exists but not associated with your account`

        return NextResponse.json({ message: finalMessage, isValid: true }, { status: 200 });
    }  catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error Occurred during validation", isValid: false }, { status: 500 });
    }
}