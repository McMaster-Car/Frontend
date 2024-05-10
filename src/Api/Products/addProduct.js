import Axios from "../Connection/Connect"

export const addProduct = async(product) => {
    try {
        const response = await Axios.post('/products/add-product', product)
        return response.data
    } catch (error) {
        return error.response.data
    }
}