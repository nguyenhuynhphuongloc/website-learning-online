import { IsDate, IsEmail, IsOptional, IsString, Max } from "class-validator";


export class UpdateCommentDto {

    @IsString()
    @IsOptional()
    @Max(50)
    title: string;

    @IsDate()
    @IsOptional()
    createAt: Date;

    @IsDate()
    @IsOptional()
    updateAt: Date;

}