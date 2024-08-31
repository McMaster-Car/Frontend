import Axios from "../Connection/Connect"

export const infoAttribute = async(data) => {
    try {
        const response = await Axios.put('/attributes/updateInfo' , data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}