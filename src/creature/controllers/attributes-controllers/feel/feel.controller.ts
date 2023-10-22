import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feeling } from '../../../entities/attributes/feeling.entity';
import { FeelingDto } from '../../../dtos/income/attributes/feeling.dto';

const route = 'feeling';
@Controller(route)
export class FeelController extends BasicController<Feeling, FeelingDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Feeling)
    private readonly feelingRepository: Repository<Feeling>,
  ) {
    super(additionalService, feelingRepository, route);
  }
}
