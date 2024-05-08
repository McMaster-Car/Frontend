import Axios from "../Connection/Connect"

export const getUsers = async() => {
    try {
        const response = await Axios.get('/user/getUsers')
        return response.data
    } catch (error) {
        return error.response.data
    }
}