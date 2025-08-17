import { PartialType } from '@nestjs/mapped-types';
import { CreateWritingResultDto } from './create-writing-result.dto';

export class UpdateWritingResultDto extends PartialType(CreateWritingResultDto) {}
