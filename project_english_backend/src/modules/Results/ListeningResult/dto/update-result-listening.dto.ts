import { PartialType } from '@nestjs/mapped-types';
import { CreateResultListeningDto } from './create-result-listening.dto';

export class UpdateResultListeningDto extends PartialType(CreateResultListeningDto) {}
