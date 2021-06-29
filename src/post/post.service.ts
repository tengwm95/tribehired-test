import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { PostAPI, PostCommentCount } from './types';
import _ from 'lodash';
import { CommentAPI } from 'src/shared/view-models/comment';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  async getPostList() {
    const comments: CommentAPI[] = await this.httpService
      .get('https://jsonplaceholder.typicode.com/comments')
      .pipe(map((resp) => resp.data))
      .toPromise();

    const postCommentCounts: PostCommentCount[] = _(comments)
      .groupBy('postId')
      .map((grouped, key) => ({
        postId: parseInt(key),
        commentCount: _.uniqBy(grouped, 'id').length,
      }))
      .value();

    const posts: PostAPI[] = await this.httpService
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((resp) => resp.data))
      .toPromise();

    const mergeds = _.merge(
      _.keyBy(posts, 'id'),
      _.keyBy(postCommentCounts, 'postId'),
    );

    const data = _.values(mergeds)
      .map((merged) => ({
        post_id: merged.id,
        post_title: merged.title,
        post_body: merged.body,
        total_number_of_comments: merged.commentCount,
      }))
      .sort(
        (prev, next) =>
          next.total_number_of_comments - prev.total_number_of_comments,
      );

    return data;
  }
}
