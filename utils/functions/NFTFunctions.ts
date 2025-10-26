import { AccountId } from "@hashgraph/sdk";

export async function getNftInfo(accountId: string | AccountId) {
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