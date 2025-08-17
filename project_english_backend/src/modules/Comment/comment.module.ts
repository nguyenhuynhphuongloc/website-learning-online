import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { CommentControler } from 'src/modules/Comment/comment.controller';
import { CommentService } from 'src/modules/Comment/comment.service';
import { Comment, CommentSchema } from 'src/schemas/Comment.schemas';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Comment.name,
            schema: CommentSchema
        }
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
    ],

    controllers: [CommentControler],
    providers: [CommentService, AuthModule],
})
export class CommentModule { }
