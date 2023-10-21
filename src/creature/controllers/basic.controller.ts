import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdditionService } from '../services/addition.service';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesEnum } from '../../auth/roles/roles.enum';

export class BasicController<T, D> {
  constructor(
    private readonly additionService: AdditionService,
    private readonly repository: Repository<T>,
  ) {}

  @Get('')
  getAll() {
    return this.additionService.getAll(this.repository);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.additionService.getOne(id, this.repository);
  }

  @UseGuards(JwtAuthGuard)
  @Roles([RolesEnum.ADMIN])
  @Post()
  create(@Body('data') body: D) {
    return this.additionService.create(body, this.repository);
  }

  @UseGuards(JwtAuthGuard)
  @Roles([RolesEnum.ADMIN])
  @Patch(':id')
  update(@Param('id') id: number, @Body('data') body) {
    return this.additionService.update(id, body, this.repository);
  }

  @UseGuards(JwtAuthGuard)
  @Roles([RolesEnum.ADMIN])
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.additionService.delete(id, this.repository);
  }
}
