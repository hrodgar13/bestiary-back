import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { Type } from '../../../entities/attributes/type.entity';
import { TypeDto } from '../../../dtos/income/attributes/type.dto';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const route = 'type';

@Controller(route)
export class TypeController extends BasicController<Type, TypeDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
  ) {
    super(additionalService, typeRepository, route);
  }
}
