
import { createUrl } from './../utils';
import axios from 'axios';
export async function registerTraveler(){
    try{
        const url = createUrl('traveler/register')
        const body = 
        {

        }
        const response = await axios.post(url, body);
        return response.data
    } catch(ex){
        return {status: 'error', error: ex}
    }
}
export async function registerOperator(){
    try{
        const url = createUrl('Operator/register')
        const body = 
        {

        }
        const response = await axios.post(url, body);
        return response.data
    } catch(ex){
        return {status: 'error', error: ex}
    }
}