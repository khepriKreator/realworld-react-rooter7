export interface LoginUser {
    email: string;
    password: string;
  }
  
  export interface LoginUserRequest {
    user: LoginUser;
  }
  
  export interface NewUser {
    username: string;
    email: string;
    password: string;
  }
  
  export interface NewUserRequest {
    user: NewUser;
  }
  
  export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  }
  
  export interface UserResponse {
    user: User;
  }
  
  export interface UpdateUser {
    email?: string;
    token?: string;
    username?: string;
    bio?: string;
    image?: string;
  }
  
  export interface UpdateUserRequest {
    user: UpdateUser;
  }
  
  // Profile-related types
  export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  }
  
  export interface ProfileResponse {
    profile: Profile;
  }
  
  // Article-related types
  export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
  }
  
  export interface SingleArticleResponse {
    article: Article;
  }
  
  export interface MultipleArticlesResponse {
    articles: Article[];
    articlesCount: number;
  }
  
  export interface NewArticle {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  }
  
  export interface NewArticleRequest {
    article: NewArticle;
  }
  
  export interface UpdateArticle {
    title?: string;
    description?: string;
    body?: string;
  }
  
  export interface UpdateArticleRequest {
    article: UpdateArticle;
  }
  
  // Comment-related types
  export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
  }
  
  export interface SingleCommentResponse {
    comment: Comment;
  }
  
  export interface MultipleCommentsResponse {
    comments: Comment[];
  }
  
  export interface NewComment {
    body: string;
  }
  
  export interface NewCommentRequest {
    comment: NewComment;
  }
  
  // Tag-related types
  export interface TagsResponse {
    tags: string[];
  }
  
  // Error model
  export interface GenericErrorModel {
    errors: {
      body: string[];
    };
  }
  
  // Query parameters types
  export interface ArticleQueryParams {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  }
  
  export interface FeedQueryParams {
    limit?: number;
    offset?: number;
  }
