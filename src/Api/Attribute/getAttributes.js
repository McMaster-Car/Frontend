import Axios from "../Connection/Connect"

export const getAttributes = async() => {
    try {
        const response = await Axios.get('/attributes/view-attributes')
        return response.data
    } catch (error) {
        return error.response.data
    }
}