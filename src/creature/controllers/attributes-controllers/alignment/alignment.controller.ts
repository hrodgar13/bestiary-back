import { Body, Controller, Post } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AlignmentDto } from '../../../dtos/income/attributes/alignment.dto';
import { Alignment } from '../../../entities/attributes/alignment.entity';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const route = 'alignment';

@Controller(route)
export class AlignmentController extends BasicController<
  Alignment,
  AlignmentDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Alignment)
    private readonly alignmentRepository: Repository<Alignment>,
  ) {
    super(additionalService, alignmentRepository, route); // треба прокинути значення роута
  }
}
