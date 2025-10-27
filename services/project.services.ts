import { AxiosHelper } from "../utils/Axioshelpers";

const {sendRequest} = AxiosHelper();

export async function fetchProjects() {
    const data = await sendRequest({
        config: {
            method: "GET",
            url: `/api/projects`
        }
    });
    return data;
}

export async function donateToProject(amount: number, id: string, hederaAccountId: string) {
    const response = await sendRequest({
        config: {
            method: "POST",
            url: `/api/projects/${id}/fund`,
            data: {
                amount,
                hederaAccountId
            }
        }
    })

    return response;
}