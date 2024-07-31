export default class AccountService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getAccounts(userId, year, month) {
        const query = `?userId=${userId}&` + (month?`year=${year}&month=${month}`:`year=${year}`);
        return this.http.fetch(`/account${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return{
            Authorization: `Bearer ${token}`,
        };
    }    
}