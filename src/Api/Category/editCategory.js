import Axios from "../Connection/Connect"

export const editCategory = async(id ,data) => {
    try {
        const response = await Axios.put(`/categories/edit-category/${id}` , data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}