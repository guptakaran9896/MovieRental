import { API_METHODS } from "../../utils/Constants";
import { ApiHandler } from "../apiHandler/apiHandler";
export const doGET = async function (url) {
    const reqParam = {};
    const method = API_METHODS.GET;
    const endPoint = url;
    try {
        const response = await ApiHandler({ reqParam, method, endPoint });
        if (response?.status === 200 || response == null) {
            return response;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (err) {
        throw new Error(err.message);

    }
};

export const doPOST = async function (url, data) {
    const reqParam = data;
    const method = API_METHODS.POST;
    const endPoint = url;
    try {
        const response = await ApiHandler({ reqParam, method, endPoint });
        if (response?.status === 200) {
            return response;
        } else {
            throw new Error(response?.data?.message);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};


