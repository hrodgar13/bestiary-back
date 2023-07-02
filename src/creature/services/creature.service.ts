import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../entities/creature.entity";
import {Repository} from "typeorm";
import {CreateMainCreatureDto} from "../dtos/create-main-creature.dto";
import {CreateAdditionsCreatureDto} from "../dtos/create-additions-creature.dto";
import {Skill} from "../entities/skill.entity";
import {StatBlock} from "../entities/stat-block.entity";
import {Speed} from "../entities/speed.entity";
import {SavingThrow} from "../entities/saving-throw.entity";
import {DamageType} from "../entities/damage-type.entity";
import {Statement} from "../entities/statement.entity";
import {FeelModifiers} from "../entities/feels-modifier.entity";
import {Language} from "../entities/language.entity";
import {Ability} from "../entities/abilities.entity";
import {Action} from "../entities/action.entity";

@Injectable()
export class CreatureService {
    constructor(
        @InjectRepository(Creature) private repo: Repository<Creature>,
        @InjectRepository(Skill) private skillRepo: Repository<Skill>,
        @InjectRepository(StatBlock) private statRepo: Repository<StatBlock>,
        @InjectRepository(Speed) private speedsRepo: Repository<Speed>,
        @InjectRepository(SavingThrow) private savingThrowRepo: Repository<SavingThrow>,
        @InjectRepository(DamageType) private damageTypeRepo: Repository<DamageType>,
        @InjectRepository(Statement) private statementRepo: Repository<Statement>,
        @InjectRepository(FeelModifiers) private feelsRepo: Repository<FeelModifiers>,
        @InjectRepository(Language) private langRepo: Repository<Language>,
        @InjectRepository(Ability) private abilityRepo: Repository<Ability>,
        @InjectRepository(Action) private actionsRepo: Repository<Action>,
    ) {}

    async create(creatureMainPartDto: CreateMainCreatureDto, creatureAdditionalPartDto: CreateAdditionsCreatureDto) {
        console.log(creatureAdditionalPartDto)
        const creature = this.repo.create(creatureMainPartDto);
        creature.creature_size_id = creatureAdditionalPartDto.creature_size_id;
        creature.creature_type_id = creatureAdditionalPartDto.creature_type_id;
        creature.creature_aligment_id = creatureAdditionalPartDto.creature_aligment_id;
        creature.armor_type_id = creatureAdditionalPartDto.armor_type_id;
        creature.creature_stat_block = await this.statRepo.findOneById(creatureAdditionalPartDto.creature_stat_block);

        creature.creature_skills = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_skill, this.skillRepo)
        creature.creature_speeds = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_speeds, this.speedsRepo)
        creature.creature_saving_throws = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_saving_throws, this.savingThrowRepo)
        creature.creature_vulnerability = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_vulnerabilities, this.damageTypeRepo)
        creature.creature_resistance = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_resistances, this.damageTypeRepo)
        creature.creature_immunity = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_immunities, this.damageTypeRepo)
        creature.creature_statement_immunity = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_statement_immunities, this.statementRepo)
        creature.creature_feels = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_feels, this.feelsRepo)
        creature.creature_languages = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_languages, this.langRepo)
        creature.creature_abilities = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_abilities, this.abilityRepo)
        creature.creature_actions = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_actions, this.actionsRepo)
        creature.creature_bonus_action = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_bonus_actions, this.actionsRepo)
        creature.creature_legendary_action = await this.manyToManyDataSerialize(creatureAdditionalPartDto.creature_legendary_actions, this.actionsRepo)

        return this.repo.save(creature);
    }

    findOne(id: number) {
        return this.repo.createQueryBuilder('creature')
            .leftJoinAndSelect('creature.creature_images', 'images')
            .leftJoinAndSelect('creature.creature_size_id', 'size')
            .leftJoinAndSelect('creature.creature_type_id', 'type')
            .leftJoinAndSelect('creature.creature_aligment_id', 'aligment')
            .leftJoinAndSelect('creature.creature_speeds', 'speeds')
            .leftJoinAndSelect('creature.creature_stat_block', 'stat-block')
            .leftJoinAndSelect('creature.creature_saving_throws', 'saving-throw')
            .leftJoinAndSelect('creature.creature_skills', 'skills')
            .leftJoinAndSelect('creature.creature_vulnerability', 'vulnerability')
            .leftJoinAndSelect('creature.creature_resistance', 'resistance')
            .leftJoinAndSelect('creature.creature_immunity', 'immunity')
            .leftJoinAndSelect('creature.creature_feels', 'feels')
            .leftJoinAndSelect('creature.creature_languages', 'languages')
            .leftJoinAndSelect('creature.creature_abilities', 'abilities')
            .leftJoinAndSelect('creature.creature_actions', 'action')
            .leftJoinAndSelect('creature.creature_bonus_action', 'bonus_action')
            .leftJoinAndSelect('creature.creature_legendary_action', 'legendary_action')
            .where('creature.id = :id', {id}).getOne()
    }

    private async manyToManyDataSerialize(data_ids: number[], repo: Repository<any>) {
        let data: any[] = []

        for (const data_id of data_ids) {
            data.push(await repo.findOneById(data_id))
        }

        return data;
    }
}
