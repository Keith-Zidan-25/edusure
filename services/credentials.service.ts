import { AxiosHelper } from "../utils/Axioshelpers";

const {sendRequest} = AxiosHelper();

export async function fetchCredentials(userId: string) {
    const data = await sendRequest({
        config: {
            method: "GET",
            url: `/api/NFTs/${userId}`
        }
    });

    if (data.nfts) {
        return data.nfts;
    }

    return null;
}

export async function validateCredentials(hederaAccountId: string, tokenId: string) {
    const response = await sendRequest({
        config: {
            method: "POST",
            url: "/api/NFTs/validate",
            data: JSON.stringify({
                hederaAccountId,
                tokenId
            })
        }
    })

    return response;
}