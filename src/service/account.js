export default class AccountService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getAccounts(userId, year, month, day) {
        let query = `?userId=${userId}`;
        if (month) {
            query += `&year=${year}`;
            if (day) query += `&month=${month}&day=${day}`;
            else query += `&month=${month}`;
        } else query += `&year=${year}`;
        return this.http.fetch(`/account${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async createAccount(userId, first, second, amount, description, title) {
        const data = { userId, first, second, amount, description, title };
        return this.http.fetch('/account', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
    }

    async updateAccount(accId, first, second, amount, description, title) {
        const data = { accId, first, second, amount, description, title };
        const query = `/accId=${accId}`;
        return this.http.fetch(`/account${query}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
    }

    async deleteAccount(accId) {
        const data = { accId };
        const query = `/accId=${accId}`
        return this.http.fetch(`/account${query}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }

}