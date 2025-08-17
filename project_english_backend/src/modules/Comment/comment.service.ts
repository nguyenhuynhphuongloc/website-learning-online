import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCommentDto, CreateReplyDto } from "src/modules/Comment/dto/CreateComment.dto";
import { UpdateCommentDto } from "src/modules/Comment/dto/UpdateComment.dto";
import { Comment } from 'src/schemas/Comment.schemas';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private CommentModel: Model<Comment>) { }

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.CommentModel.create(createCommentDto);
    }

    async createReply(commentId: string, reply: CreateReplyDto): Promise<Comment> {

        const comment = await this.CommentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        comment.replies.push(reply);

        return await comment.save();
    }

    async getComments(): Promise<Comment[]> {
        console.log("successful");
        return await this.CommentModel.find().exec();
    }

    async getCommentByid(id: string) {
        console.log("successful");
        return await this.CommentModel.findById(id);
    }

    async updateComment(id: string, updateComment: UpdateCommentDto) {
        console.log("successful");
        return await this.CommentModel.findByIdAndUpdate(id, updateComment);
    }

    async DeleteComment(id: string) {
        console.log("successful");
        return await this.CommentModel.findByIdAndDelete(id);
    }
}