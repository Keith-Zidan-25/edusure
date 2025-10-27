import { AxiosHelper } from "../utils/Axioshelpers"
import { SignUpFormData } from "../utils/types/auth";

const {sendRequest} = AxiosHelper();

export const loginService = async (credentials: SignUpFormData) => {
    const dataObject = {
        email: credentials.email,
        password: credentials.password
    }
    const data = await sendRequest({
        config: {
            url: "/api/auth/login",
            method: "POST",
            data: dataObject
        }
    });
    return data;
}

export const registerService = async (userData: SignUpFormData) => {
    const dataObject = {
        username: userData.username,
        email: userData.email,
        password: userData.password
    }

    const data = await sendRequest({
        config: {
            url: "/api/auth/register",
            method: "POST",
            data: dataObject
        }
    });
    return data;
}