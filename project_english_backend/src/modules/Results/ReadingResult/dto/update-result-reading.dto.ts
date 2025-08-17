import { PartialType } from '@nestjs/mapped-types';
import { CreateResultReadingDto } from './create-result-reading.dto';

export class UpdateResultReadingDto extends PartialType(CreateResultReadingDto) {}
