import {Injectable} from "@nestjs/common";
import {
    CreateArmorClassDto,
    CreateDamageType,
    CreateElementsDto,
    CreateFeelDto,
    CreateStatBlockDto
} from "../dtos/create-elements.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Aligment} from "../entities/aligment.entity";
import {Repository} from "typeorm";
import {ArmorClass} from "../entities/armor-class.entity";
import {StatBlock} from "../entities/stat-block.entity";
import {Feel} from "../entities/feel.entity";
import {DamageType} from "../entities/damage-type.entity";

@Injectable()
export class ElementsService {
    constructor(
        @InjectRepository(Aligment) private alignmentRepo: Repository<Aligment>,
        @InjectRepository(ArmorClass) private armorRepo: Repository<ArmorClass>,
        @InjectRepository(StatBlock) private statBlockRepo: Repository<StatBlock>,
        @InjectRepository(Feel) private feelRepo: Repository<Feel>,
        @InjectRepository(DamageType) private damageRepo: Repository<DamageType>,
    ) {

    }


    createAlignment(body: CreateElementsDto) {
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

    createDamageType(body: CreateDamageType) {
        return this.damageRepo.save(body);
    }
}