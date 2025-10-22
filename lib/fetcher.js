import api from "./api";

const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data; // clearn data 
};

export default fetcher;