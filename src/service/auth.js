import axios from 'axios';

export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(id, pw, name, nick, email, addr, gender, classification) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        id,
        pw,
        name,
        nick,
        email,
        addr,
        gender,
        classification,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(id, pw) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        id,
        pw,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async kakaoLogin(code) {
    try {
      const response = await axios.get(`http://localhost:8000/oauth/callback/kakao?code=${code}`);
      this.tokenStorage.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error during Kakao login:', error);
      throw error;
    }
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
