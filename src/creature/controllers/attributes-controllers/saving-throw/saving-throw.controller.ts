import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingThrow } from '../../../entities/attributes/saving-throw.entity';
import { SavingThrowDto } from '../../../dtos/income/attributes/saving-throw.dto';

const route = 'saving-throw';
@Controller(route)
export class SavingThrowController extends BasicController<
  SavingThrow,
  SavingThrowDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(SavingThrow)
    private readonly savingThrowRepository: Repository<SavingThrow>,
  ) {
    super(additionalService, savingThrowRepository, route);
  }
}
