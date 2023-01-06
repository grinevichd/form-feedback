import axios from "axios";

export const FormApi = {
    sendMessage(obj : any){
        return axios.post('https://gmail-node.vercel.app/sendMessage', {obj})
    }
}