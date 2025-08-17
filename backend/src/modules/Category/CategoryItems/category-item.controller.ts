import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryItemService } from './category-item.service';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';

@Controller('category-item')
export class CategoryItemController {
  constructor(private readonly categoryItemService: CategoryItemService) {}

  @Post()
  create(@Body() createCategoryItemDto: CreateCategoryItemDto) {
    return this.categoryItemService.create(createCategoryItemDto);
  }

  @Get()
  findAll() {
    return this.categoryItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryItemDto: UpdateCategoryItemDto) {
    return this.categoryItemService.update(+id, updateCategoryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryItemService.remove(+id);
  }
}
