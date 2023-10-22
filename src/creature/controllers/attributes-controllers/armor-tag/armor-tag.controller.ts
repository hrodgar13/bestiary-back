import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorTag } from '../../../entities/attributes/armor-tag.entity';
import { ArmorTypeDto } from '../../../dtos/income/attributes/armor-tag.dto';

const route = 'armor-tag';
@Controller(route)
export class ArmorTagController extends BasicController<
  ArmorTag,
  ArmorTypeDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(ArmorTag)
    private readonly armorTagRepository: Repository<ArmorTag>,
  ) {
    super(additionalService, armorTagRepository, route);
  }
}
