import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { console } from 'inspector';
import mongoose from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CommentService } from 'src/modules/Comment/comment.service';
import { CreateCommentDto, CreateReplyDto } from 'src/modules/Comment/dto/CreateComment.dto';
import { UpdateCommentDto } from 'src/modules/Comment/dto/UpdateComment.dto';

@Controller('comment')
export class CommentControler {
    constructor(private commentService: CommentService) { }

    @Post('create-comment')
    CreateComment(@Body() CreateComment: CreateCommentDto) {
        return this.commentService.createComment(CreateComment);
    }

    @Post('create-reply/:commentId')
    async createReply(@Param('commentId') commentId: string, @Body() reply: CreateReplyDto) {

        const isValid = mongoose.Types.ObjectId.isValid(commentId);

        if (!isValid) throw new HttpException('User not found', 404);

        const comment = await this.commentService.createReply(commentId, reply);

        if (!comment) throw new HttpException('Comment not found', 404);


        return comment;
    }

    @Get()
    FindAll() {
        return this.commentService.getComments();
    }

    @Get(':id')
    async getUserByid(@Param('id') id: string) {


        const isValid = mongoose.Types.ObjectId.isValid(id);


        if (!isValid) throw new HttpException('User not fount 1', 404);

        const findUser = await this.commentService.getCommentByid(id);


        if (!findUser) throw new HttpException('User not found 23', 404);

        console.log("successful")

        return findUser;
    }

    @Patch(':id')
    async updateComment(@Param('id') id: string, @Body() updateComment: UpdateCommentDto) {


        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException('User not found', 404);

        return this.commentService.updateComment(id, updateComment);
    }

    @Delete(':id')
    async DeleteComment(@Param('id') id: string) {


        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException('User not found', 404);


        console.log("successful")

        return this.commentService.DeleteComment(id);
    }

}
