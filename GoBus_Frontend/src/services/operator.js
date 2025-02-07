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


export async function getTravelerBuses() {
    try{
        const url = createUrl('operator/getBuses')
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
                }
                });
                console.log(response);
                return response.data
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
                console.log(response);
                return response.data
                } catch(ex){
                    return {status: 'error', error: ex}
                }
            
    }

    export async function getOperator() {
        try{
            const url = createUrl('operator/getOperator')
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                    }
                    });
                    return response
                    } catch(ex){
                        return {status: 'error', error: ex}
                    }
                
        }


        export async function approve(agencyName) {
            try{
                const url = createUrl('operator/approve')
                const response = await axios.post(
                    url, 
                    null, // No request body since params are sent via URL
                    {
                      headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Include JWT token in the request
                      },
                      params: {
                        agencyName: agencyName, // This will be converted to "?agencyName=XYZ"
                      },
                    }
                  );
                        return response
                        } catch(ex){
                            return {status: 'error', error: ex}
                        }
                    
            }


    export async function addBus(bus){
        try{
            const token = sessionStorage.getItem("token");
            const url = createUrl('operator/addBus')
            const response = await axios.post(url,bus,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                    }
                    });
                    return response
                    } catch(ex){
                        return {status: 'error', error: ex}
                        
    }
}

      
   