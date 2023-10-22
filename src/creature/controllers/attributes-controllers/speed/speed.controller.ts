import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speed } from '../../../entities/attributes/speed.entity';
import { SpeedDto } from '../../../dtos/income/attributes/speed.dto';

const route = 'speed';
@Controller(route)
export class SpeedController extends BasicController<Speed, SpeedDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Speed)
    private readonly speedRepository: Repository<Speed>,
  ) {
    super(additionalService, speedRepository, route);
  }
}
