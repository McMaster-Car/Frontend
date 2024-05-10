import Axios from "../Connection/Connect"

export const deleteProduct = async(id) => {
    try {
        const response = await Axios.delete(`/products/delete-product/${id}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}