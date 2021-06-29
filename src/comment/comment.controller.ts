import { Controller, Get, Query } from '@nestjs/common';
import { CommentFilter } from 'src/shared/view-models/comment';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getCommentsByFilter(@Query() filters: CommentFilter) {
    return await this.commentService.getCommentsByFilter(filters);
  }
}
