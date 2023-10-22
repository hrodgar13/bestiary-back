import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../../entities/attributes/skill.entity';
import { SkillDto } from '../../../dtos/income/attributes/skill.dto';

const route = 'skill';
@Controller(route)
export class SkillController extends BasicController<Skill, SkillDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(additionalService, skillRepository, route);
  }
}
