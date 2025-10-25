import { AxiosHelper } from "@/utils/Axioshelpers"
import { SignUpFormData } from "@/utils/types/auth";

const {sendRequest} = AxiosHelper();

export const loginService = async (credentials: SignUpFormData) => {
    const data = await sendRequest({
        config: {
            url: "/api/auth/login",
            method: "POST",
            data: credentials
        }
    });
    return data;
}

export const registerService = async (userData: SignUpFormData) => {
    const data = await sendRequest({
        config: {
            url: "/api/auth/register",
            method: "POST",
            data: userData
        }
    });
    return data;
}