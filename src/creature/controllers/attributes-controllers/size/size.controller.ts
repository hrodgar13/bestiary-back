import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from '../../../entities/attributes/size.entity';
import { SizeDto } from '../../../dtos/income/attributes/size.dto';

const route = 'size';
@Controller(route)
export class SizeController extends BasicController<Size, SizeDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {
    super(additionalService, sizeRepository, route);
  }
}
