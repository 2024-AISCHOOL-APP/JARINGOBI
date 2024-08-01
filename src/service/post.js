export default class PostService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getPosts(userId) {
    const query = userId ? `?userId=${userId}` : '';
    return this.http.fetch(`/community${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async postLike(postId, userId) {
    return this.http.fetch(`/${postId}/like`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ userId }),
    });
  }

  async getPostLike(postId) {
    return this.http.fetch(`/community/${postId}/like`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async createPost(text, title, tag, userId) {
    return this.http.fetch(`/community`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, title, tag, userId }),
    });
  }

  async getPostById(postId) {
    return this.http.fetch(`/community/${postId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async updatePost(postId, text, title, tag) {
    return this.http.fetch(`/community/${postId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, title, tag }),
    });
  }

  async deletePost(postId) {
    return this.http.fetch(`/community/${postId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
