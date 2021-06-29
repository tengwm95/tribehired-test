export interface Post {
  postId: string;
  postTitle: string;
  postBody: string;
  totalNumberOfComment: string;
}

export interface PostAPI {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostCommentCount {
  postId: number;
  commentCount: number;
}
