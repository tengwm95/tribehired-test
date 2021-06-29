import { HttpModule, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
