export interface CommentAPI {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentFilter {
  name: string;
  email: string;
  body: string;
}
