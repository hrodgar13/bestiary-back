import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../../../entities/attributes/region.entity';
import { RegionDto } from '../../../dtos/income/attributes/region.dto';

const route = 'region';

@Controller(route)
export class RegionController extends BasicController<Region, RegionDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {
    super(additionalService, regionRepository, route); // треба прокинути значення роута
  }
}
