import Axios from "../Connection/Connect"

export const addNewValue = async(data) => {
    try {
        const response = await Axios.put('/attributes/addAttribute/value' , data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}