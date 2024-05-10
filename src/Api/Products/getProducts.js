import Axios from "../Connection/Connect"

export const getProducts = async() => {
    try {
        const response = await Axios.get('/products/view-products')
        return response.data
    } catch (error) {
        return error.response.data
    }
}