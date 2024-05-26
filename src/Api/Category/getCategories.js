import Axios from "../Connection/Connect"

export const getCategories = async() => {
    try {
        const response = await Axios.get('/categories/view-categories')
        return response.data
    } catch (error) {
        return error.response.data
    }
}