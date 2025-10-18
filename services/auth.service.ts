import { AxiosHelper } from "@/utils/Axioshelpers"

const {sendRequest} = AxiosHelper();

export const loginService = async (credentials: FormData) => {
    const data = await sendRequest({
        config: {
            url: "/api/auth/login",
            method: "POST",
            data: credentials
        }
    });
    return data;
}

export const registerService = async (userData: FormData) => {
    const data = await sendRequest({
        config: {
            url: "/api/auth/register",
            method: "POST",
            data: userData
        }
    });
    return data;
}