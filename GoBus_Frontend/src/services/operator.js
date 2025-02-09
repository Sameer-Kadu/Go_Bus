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


export async function getTravelerBuses({ source, destination, date }) {
    console.log(`Searching buses for: Source=${source}, Destination=${destination}, Date=${date}`);

    try {
        const url = createUrl("bus/search");

        const response = await axios.get(url,{
            params: { 
                source: String(source), // Ensure source is a string
                destination: String(destination), // Ensure destination is a string
                date: new Date(date).toISOString().split('T')[0] // Ensure date is a valid string
            },
    });

        console.log("Response:", response.data);
        return response.data;
    } catch (ex) {
        console.error("Error fetching buses:", ex);
        return { status: "error", error: ex };
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

      
   