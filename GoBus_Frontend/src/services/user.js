import { createUrl } from './../utils';
import axios from 'axios';
export async function registerUser(name, email, phoneNumber, password, role){
    try{
        const url = createUrl('User/signup')
        const body = 
        {
          name, email, phoneNumber, password, role
        }
        const response = await axios.post(url, body);
        console.log(response);
        return response
    } catch(ex){
        return {status: 'error', error: ex}
    }
}

export async function loginUser(email, password){
  try{
    const url = createUrl('User/signin')
    const body =
    {
      email, password
    }
    const response = await axios.post(url, body);
    return response
  }catch(ex){
    return {status: 'error', error: ex}
  }
}