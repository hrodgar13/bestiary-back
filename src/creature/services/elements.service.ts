import {Injectable} from "@nestjs/common";
import {
    CreateArmorClassDto,
    CreateDamageTypeDto,
    CreateAlignmentDto,
    CreateFeelDto,
    CreateLanguageDto,
    CreateStatBlockDto,
    CreateSavingThrowDto,
    CreateSpeedTypeDto,
    CreateSkillDto,
    CreateSizeDto,
    CreateTypeDto,
    CreateStatementDto
} from "../dtos/create-elements.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Aligment} from "../entities/aligment.entity";
import {Repository} from "typeorm";
import {ArmorClass} from "../entities/armor-class.entity";
import {StatBlock} from "../entities/stat-block.entity";
import {Feel} from "../entities/feel.entity";
import {DamageType} from "../entities/damage-type.entity";
import {Language} from "../entities/language.entity";
import {Size} from "../entities/size.entity";
import {SavingThrow} from "../entities/saving-throw.entity";
import {Skill} from "../entities/skill.entity";
import {Speed} from "../entities/speed.entity";
import {Type} from "../entities/type.entity";
import {Statement} from "../entities/statement.entity";

@Injectable()
export class ElementsService {
    constructor(
        @InjectRepository(Aligment) private alignmentRepo: Repository<Aligment>,
        @InjectRepository(ArmorClass) private armorRepo: Repository<ArmorClass>,
        @InjectRepository(StatBlock) private statBlockRepo: Repository<StatBlock>,
        @InjectRepository(Feel) private feelRepo: Repository<Feel>,
        @InjectRepository(DamageType) private damageRepo: Repository<DamageType>,
        @InjectRepository(Language) private languageRepo: Repository<Language>,
        @InjectRepository(Size) private sizeRepo: Repository<Size>,
        @InjectRepository(SavingThrow) private savingThrowRepo: Repository<SavingThrow>,
        @InjectRepository(Skill) private skillRepo: Repository<Skill>,
        @InjectRepository(Speed) private speedRepo: Repository<Speed>,
        @InjectRepository(Type) private typeRepo: Repository<Type>,
        @InjectRepository(Statement) private statementRepo: Repository<Statement>,
    ) {

    }


    createAlignment(body: CreateAlignmentDto) {
        return this.alignmentRepo.save(body)
    }

    createArmorType(body: CreateArmorClassDto) {
        return this.armorRepo.save(body)
    }

    createStatBlock(body: CreateStatBlockDto) {
        return this.statBlockRepo.save(body)
    }

    createFeel(body: CreateFeelDto) {
        return this.feelRepo.save(body)
    }

    createDamageType(body: CreateDamageTypeDto) {
        return this.damageRepo.save(body);
    }

    createLanguage(body: CreateLanguageDto) {
        return this.languageRepo.save(body)
    }

    createSavingThrow(body: CreateSavingThrowDto) {
        return this.savingThrowRepo.save(body)
    }

    createSize(body: CreateSizeDto) {
        return this.sizeRepo.save(body)
    }

    createSkill(body: CreateSkillDto) {
        return this.skillRepo.save(body)
    }

    createSpeedType(body: CreateSpeedTypeDto) {
        return this.speedRepo.save(body)
    }

    createType(body: CreateTypeDto) {
        return this.typeRepo.save(body)
    }

    createStatement(body: CreateStatementDto) {
        return this.statementRepo.save(body)
    }
}