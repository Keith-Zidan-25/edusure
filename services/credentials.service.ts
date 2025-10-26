import { Credential } from "@/utils/types/credentials";
import { AxiosHelper } from "@/utils/Axioshelpers";

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