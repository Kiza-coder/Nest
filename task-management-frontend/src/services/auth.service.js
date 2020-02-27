import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    try{
    const result = await post(`${this.BASE_URL}/auth/signin`, { username, password });
    console.log(result);
    const accessToken = result.data.accesToken;
    console.log(accessToken);
    this.saveToken(accessToken);
    return result.data.username;
    }
    catch(error){
        console.log(error)
    }
    
  }

  async signup(username, password) {
    await post(`${this.BASE_URL}/auth/signup`, { username, password });
  }

  async signout() {
    this.removeToken();
  }
}
