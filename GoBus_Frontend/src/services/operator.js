import { createUrl } from '../utils';
import axios from 'axios';
export async function registerOperator(formData){
    const token = sessionStorage.getItem("token");
    
    try{
        const url = createUrl('operator/register')
        const response = await axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }});
        console.log("response:- "+response);
        return response
    } catch(ex){
        return {status: 'error', error: ex}
    }
}


export async function getBuses() {
    try{
        const url = createUrl('operator/getBuses')
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
                }
                });
                return response.data
                } catch(ex){
                    return {status: 'error', error: ex}
                }
            
    }

      
   