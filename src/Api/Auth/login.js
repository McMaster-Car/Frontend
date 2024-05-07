import Axios from "../Connection/Connect";

export const Login = async( email , password)=>{
    try {
        const response = await Axios.post('/user/login' , {email , password} )
        return response.data
    } catch (error) {
        return error.response.data
    }
}