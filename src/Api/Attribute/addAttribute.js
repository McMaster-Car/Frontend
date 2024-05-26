import Axios from "../Connection/Connect"

export const addAttributes = async(data) => {
    try {
        const response = await Axios.post('/attributes/add-attributes' , data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}