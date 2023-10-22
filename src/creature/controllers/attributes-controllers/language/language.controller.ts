import { Controller } from '@nestjs/common';
import { BasicController } from '../basic/basic.controller';
import { AdditionService } from '../../../services/addition/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../../../entities/attributes/language.entity';
import { LanguageDto } from '../../../dtos/income/attributes/language.dto';

const route = 'language';
@Controller(route)
export class LanguageController extends BasicController<Language, LanguageDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {
    super(additionalService, languageRepository, route);
  }
}
