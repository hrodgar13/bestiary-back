import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from '../../../entities/attributes/condition.entity';
import { ConditionDto } from '../../../dtos/income/attributes/condition.dto';

const route = 'condition';
@Controller(route)
export class ConditionController extends BasicController<
  Condition,
  ConditionDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {
    super(additionalService, conditionRepository, route);
  }
}
