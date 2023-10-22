import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Damage } from '../../../entities/attributes/damage.entity';
import { DamageDto } from '../../../dtos/income/attributes/damage.dto';

const route = 'damage';
@Controller(route)
export class DamageController extends BasicController<Damage, DamageDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Damage)
    private readonly damageRepository: Repository<Damage>,
  ) {
    super(additionalService, damageRepository, route);
  }
}
