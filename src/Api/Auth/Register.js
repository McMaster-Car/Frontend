import Axios from "../Connection/Connect";

export const Register = async(data)=>{
    try {
        const response = await Axios.post('/user/register' , data )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}