import { Controller } from '@nestjs/common';
import { BasicController } from './basic.controller';
import {
  CreateAlignmentDto,
  CreateArmorDto,
  CreateDamageTypeDto,
  CreateFeelNameDto,
  CreateLanguageDto,
  CreateSavingThrowDto,
  CreateSizeDto,
  CreateSkillDto,
  CreateSpeedTypeDto,
  CreateStatementDto,
  CreateTypeDto,
} from '../dtos/aditions.dto';
import { Size } from '../entities/size.entity';
import { AdditionService } from '../services/addition.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorClass } from '../entities/armor-class.entity';
import { Language } from '../entities/language.entity';
import { SavingThrow } from '../entities/saving-throw.entity';
import { Skill } from '../entities/skill.entity';
import { Speed } from '../entities/speed.entity';
import { Statement } from '../entities/statement.entity';
import { Feel } from '../entities/feel.entity';
import { DamageType } from '../entities/damage-type.entity';
import { Type } from '../entities/type.entity';
import { Aligment } from '../entities/aligment.entity';

@Controller('size')
export class SizeController extends BasicController<Size, CreateSizeDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Size) private readonly sizeRepository: Repository<Size>,
  ) {
    super(additionalService, sizeRepository);
  }
}

@Controller('armor-class')
export class ArmorClassController extends BasicController<
  ArmorClass,
  CreateArmorDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(ArmorClass)
    private readonly armorRepository: Repository<ArmorClass>,
  ) {
    super(additionalService, armorRepository);
  }
}

@Controller('feel')
export class FeelController extends BasicController<Feel, CreateFeelNameDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Feel) private readonly feelRepository: Repository<Feel>,
  ) {
    super(additionalService, feelRepository);
  }
}

@Controller('language')
export class LanguageController extends BasicController<
  Language,
  CreateLanguageDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {
    super(additionalService, languageRepository);
  }
}

@Controller('saving-throw')
export class SavingThrowController extends BasicController<
  SavingThrow,
  CreateSavingThrowDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(SavingThrow)
    private readonly savingThrowRepository: Repository<SavingThrow>,
  ) {
    super(additionalService, savingThrowRepository);
  }
}

@Controller('skill')
export class SkillController extends BasicController<Skill, CreateSkillDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(additionalService, skillRepository);
  }
}

@Controller('speed')
export class SpeedController extends BasicController<
  Speed,
  CreateSpeedTypeDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Speed)
    private readonly speedRepository: Repository<Speed>,
  ) {
    super(additionalService, speedRepository);
  }
}

@Controller('statement')
export class StatementController extends BasicController<
  Statement,
  CreateStatementDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Statement)
    private readonly statementRepository: Repository<Statement>,
  ) {
    super(additionalService, statementRepository);
  }
}

@Controller('damage-type')
export class DamageTypeController extends BasicController<
  DamageType,
  CreateDamageTypeDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(DamageType)
    private readonly damageTypeRepository: Repository<DamageType>,
  ) {
    super(additionalService, damageTypeRepository);
  }
}

@Controller('type')
export class TypeController extends BasicController<Type, CreateTypeDto> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
  ) {
    super(additionalService, typeRepository);
  }
}

@Controller('alignment')
export class AlignmentController extends BasicController<
  Aligment,
  CreateAlignmentDto
> {
  constructor(
    private readonly additionalService: AdditionService,
    @InjectRepository(Aligment)
    private readonly alignmentRepository: Repository<Aligment>,
  ) {
    super(additionalService, alignmentRepository);
  }
}
