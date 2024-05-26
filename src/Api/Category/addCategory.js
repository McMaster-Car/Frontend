import Axios from "../Connection/Connect"

export const addCategory = async(data) => {
    try {
        const response = await Axios.post('/categories/add-category' , data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}