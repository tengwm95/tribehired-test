import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CommentAPI, CommentFilter } from 'src/shared/view-models/comment';

@Injectable()
export class CommentService {
  private blackLists = [2, 5];
  constructor(private readonly httpService: HttpService) {}

  async getCommentsByFilter(params: CommentFilter) {
    const comments: CommentAPI[] = await this.httpService
      .get('https://jsonplaceholder.typicode.com/comments')
      .pipe(map((resp) => resp.data))
      .toPromise();

    const filteredComments = comments
      .filter((comment) => !this.blackLists.includes(comment.id))
      .filter(
        (comment) =>
          (!params?.name ||
            comment.name.toLowerCase().includes(params?.name?.toLowerCase())) &&
          (!params?.email ||
            comment.email
              .toLowerCase()
              .includes(params?.email?.toLowerCase())) &&
          (!params?.body ||
            comment.body.toLowerCase().includes(params?.body?.toLowerCase())),
      );

    return filteredComments;
  }
}
