import type { GenericErrorModel, 
  LoginUserRequest, 
  MultipleArticlesResponse,
  MultipleCommentsResponse, 
  NewArticleRequest, 
  NewCommentRequest, 
  NewUserRequest, 
  ProfileResponse, 
  SingleArticleResponse,
  SingleCommentResponse,
  TagsResponse,
  UpdateArticleRequest, 
  UpdateUserRequest, 
  UserResponse } from "../models/models";
import END_POINT from "../constants/endpoint";
// API Client Class
export class ConduitAPI {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = END_POINT) {
    this.baseUrl = baseUrl;
  }

  // Set authentication token
  setToken(token: string): void {
    this.token = token;
  }

  // Generic fetch method
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    if (this.token) {
      headers.set('Authorization', `Token ${this.token}`);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = (await response.json()) as GenericErrorModel;
      throw new Error(JSON.stringify(errorData.errors.body));
    }

    return response.json();
  }

  // User and Authentication endpoints
  async login(credentials: LoginUserRequest): Promise<UserResponse> {
    return this.fetch<UserResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: NewUserRequest): Promise<UserResponse> {
    return this.fetch<UserResponse>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<UserResponse> {
    return this.fetch<UserResponse>('/user', {
      method: 'GET',
    });
  }

  async updateCurrentUser(updateData: UpdateUserRequest): Promise<UserResponse> {
    return this.fetch<UserResponse>('/user', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Profile endpoints
  async getProfile(username: string): Promise<ProfileResponse> {
    return this.fetch<ProfileResponse>(`/profiles/${username}`, {
      method: 'GET',
    });
  }

  async followUser(username: string): Promise<ProfileResponse> {
    return this.fetch<ProfileResponse>(`/profiles/${username}/follow`, {
      method: 'POST',
    });
  }

  async unfollowUser(username: string): Promise<ProfileResponse> {
    return this.fetch<ProfileResponse>(`/profiles/${username}/follow`, {
      method: 'DELETE',
    });
  }

  // Article endpoints
  async getArticlesFeed(params?: {
    limit?: number;
    offset?: number;
  }): Promise<MultipleArticlesResponse> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return this.fetch<MultipleArticlesResponse>(`/articles/feed${queryString}`, {
      method: 'GET',
    });
  }

  async getArticles(params?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  }): Promise<MultipleArticlesResponse> {
    const queryParams = new URLSearchParams();
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.author) queryParams.append('author', params.author);
    if (params?.favorited) queryParams.append('favorited', params.favorited);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return this.fetch<MultipleArticlesResponse>(`/articles${queryString}`, {
      method: 'GET',
    });
  }

  async createArticle(article: NewArticleRequest): Promise<SingleArticleResponse> {
    return this.fetch<SingleArticleResponse>('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }

  async getArticle(slug: string): Promise<SingleArticleResponse> {
    return this.fetch<SingleArticleResponse>(`/articles/${slug}`, {
      method: 'GET',
    });
  }

  async updateArticle(slug: string, article: UpdateArticleRequest): Promise<SingleArticleResponse> {
    return this.fetch<SingleArticleResponse>(`/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  }

  async deleteArticle(slug: string): Promise<void> {
    return this.fetch<void>(`/articles/${slug}`, {
      method: 'DELETE',
    });
  }

  // Comment endpoints
  async getArticleComments(slug: string): Promise<MultipleCommentsResponse> {
    return this.fetch<MultipleCommentsResponse>(`/articles/${slug}/comments`, {
      method: 'GET',
    });
  }

  async createArticleComment(
    slug: string,
    comment: NewCommentRequest,
  ): Promise<SingleCommentResponse> {
    return this.fetch<SingleCommentResponse>(`/articles/${slug}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  }

  async deleteArticleComment(slug: string, commentId: number): Promise<void> {
    return this.fetch<void>(`/articles/${slug}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Favorite endpoints
  async favoriteArticle(slug: string): Promise<SingleArticleResponse> {
    return this.fetch<SingleArticleResponse>(`/articles/${slug}/favorite`, {
      method: 'POST',
    });
  }

  async unfavoriteArticle(slug: string): Promise<SingleArticleResponse> {
    return this.fetch<SingleArticleResponse>(`/articles/${slug}/favorite`, {
      method: 'DELETE',
    });
  }

  // Tags endpoint
  async getTags(): Promise<TagsResponse> {
    return this.fetch<TagsResponse>('/tags', {
      method: 'GET',
    });
  }
}
