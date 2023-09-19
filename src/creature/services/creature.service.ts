import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../entities/creature.entity";
import {Repository} from "typeorm";
import {SkillModifier} from "../entities/skill-modifier.entity";
import {StatBlock} from "../entities/stat-block.entity";
import {SpeedModifier} from "../entities/speed-modifier.entity";
import {SavingThrowModifier} from "../entities/saving-throw-modifier.entity";
import {DamageType} from "../entities/damage-type.entity";
import {Statement} from "../entities/statement.entity";
import {FeelModifiers} from "../entities/feels-modifier.entity";
import {Language} from "../entities/language.entity";
import {Ability} from "../entities/abilities.entity";
import {Action} from "../entities/action.entity";
import {CreateMainCreatureDto} from "../dtos/create-main-creature.dto";
import {Aligment} from "../entities/aligment.entity";
import {Size} from "../entities/size.entity";
import {Type} from "../entities/type.entity";
import {ArmorClass} from "../entities/armor-class.entity";
import {SavingThrow} from "../entities/saving-throw.entity";
import {Skill} from "../entities/skill.entity";
import {Feel} from "../entities/feel.entity";
import {Speed} from "../entities/speed.entity";
import {ActionsDto} from "../dtos/actions.dto";
import {CreateAbilityDto} from "../dtos/create-ability.dto";

@Injectable()
export class CreatureService {
    constructor(
        @InjectRepository(Creature) private creatureRepo: Repository<Creature>,
        @InjectRepository(SkillModifier) private skillModifierRepo: Repository<SkillModifier>,
        @InjectRepository(Skill) private skillRepo: Repository<Skill>,
        @InjectRepository(StatBlock) private statRepo: Repository<StatBlock>,
        @InjectRepository(Speed) private speedsRepo: Repository<Speed>,
        @InjectRepository(SavingThrowModifier) private savingThrowModifierRepo: Repository<SavingThrowModifier>,
        @InjectRepository(SavingThrow) private savingThrowRepo: Repository<SavingThrow>,
        @InjectRepository(DamageType) private damageTypeRepo: Repository<DamageType>,
        @InjectRepository(Statement) private statementRepo: Repository<Statement>,
        @InjectRepository(FeelModifiers) private feelsModifierRepo: Repository<FeelModifiers>,
        @InjectRepository(Feel) private feelsRepo: Repository<Feel>,
        @InjectRepository(Language) private langRepo: Repository<Language>,
        @InjectRepository(Ability) private abilityRepo: Repository<Ability>,
        @InjectRepository(Action) private actionsRepo: Repository<Action>,
        @InjectRepository(Aligment) private alignmentRepo: Repository<Aligment>,
        @InjectRepository(Size) private sizeRepo: Repository<Size>,
        @InjectRepository(Type) private typeRepo: Repository<Type>,
        @InjectRepository(ArmorClass) private armorRepo: Repository<ArmorClass>,
        @InjectRepository(SpeedModifier) private speedModifierRepo: Repository<SpeedModifier>,
    )
     {}

    async create(body: CreateMainCreatureDto) {
        const creature = await this.creatureRepo.create()

        creature.isFinished = body.isFinished
        creature.creature_name_EN = body.creature_name_EN
        creature.creature_name_UA = body.creature_name_UA
        creature.creature_name_tag = body.creature_name_tag
        creature.armor_Class = body.armor_Class
        creature.hit_points = +body.hit_points
        creature.hit_points_by_dices = body.hit_points_by_dices
        creature.creature_danger_level = body.creature_danger_level
        creature.creature_exp_amount = body.creature_exp_amount
        creature.creature_mastery_bonus = body.creature_mastery_bonus

        creature.creature_description_EN = body.creature_description_UA
        creature.creature_description_UA = body.creature_description_EN

        creature.creature_alignment = await this.alignmentRepo.findOne({where: {id: body.creature_alignment}});
        creature.creature_size = await this.sizeRepo.findOne({where: {id: body.creature_size}});
        creature.creature_type = await this.typeRepo.findOne({where: {id: body.creature_type}});
        creature.armor_type = await this.armorRepo.findOne({where: {id: body.armor_type}});

        creature.creature_speeds = await Promise.all(body.creature_speeds.map(async speed => {
            const speedModifier: SpeedModifier = await this.speedModifierRepo.create()

            speedModifier.speed_amount = speed.speed_amount
            speedModifier.speed_name = await this.speedsRepo.findOne({where: {id: speed.speed_name_id}})

            return speedModifier
        }));

        creature.creature_stat_block = await this.statRepo.create(body.creature_stat_block)

        creature.creature_saving_throws = await Promise.all(body.creature_saving_throws.map(async savingThrow => {
            const savingThrowModifier: SavingThrowModifier = await this.savingThrowModifierRepo.create()
            savingThrowModifier.modifier = savingThrow.modifier
            savingThrowModifier.saving_throw_name = await this.savingThrowRepo.findOne({where: {id: +savingThrow.saving_throw_name_id}})

            return savingThrowModifier
        }))

        creature.creature_skills = await Promise.all(body.creature_skills.map(async skill => {
            const skillModifier: SkillModifier = await this.skillModifierRepo.create(skill)
            skillModifier.skill_name = await this.skillRepo.findOne({where: {id: skill.skill_name_id}})

            return skillModifier
        }))


        creature.creature_vulnerability = await Promise.all(body.creature_vulnerability.map(async damage => {
            return await this.damageTypeRepo.findOne({where: {id: damage}})
        }))

        creature.creature_resistance = await Promise.all( body.creature_resistance.map(async damage => {
            return await this.damageTypeRepo.findOne({where: {id: damage}})
        }))


        creature.creature_immunity = await Promise.all(body.creature_immunity.map(async damage => {
            return await this.damageTypeRepo.findOne({where: {id: damage}})
        }))

        creature.creature_feels = await Promise.all(body.creature_feels.map(async feel => {
            const feelModifier = await this.feelsModifierRepo.create();
            feelModifier.feel_modifier = feel.feel_modifier
            feelModifier.feel_measure_EN = feel.feel_measure_EN
            feelModifier.feel_measure_UA = feel.feel_measure_UA
            feelModifier.feel_name = await this.feelsRepo.findOne({where: {id: feel.feel_id}})

            return feelModifier
        }))

        creature.creature_languages = await Promise.all(body.creature_languages.map(async (language: number) => {
            return await this.langRepo.findOne({where: {id: language}})
        }))

        creature.creature_abilities = await this.createAbility(body.creature_abilities)

        creature.creature_actions = await this.createAction(body.creature_actions)

        creature.creature_bonus_action = await this.createAction(body.creature_bonus_action)

        creature.creature_legendary_action = await this.createAction(body.creature_legendary_action)

        return this.creatureRepo.save(creature)
    }

    findOne(id: number) {
        return this.creatureRepo.createQueryBuilder('creature')
            .leftJoinAndSelect('creature.creature_images', 'images')
            .leftJoinAndSelect('creature.creature_size_id', 'size')
            .leftJoinAndSelect('creature.creature_type_id', 'type')
            .leftJoinAndSelect('creature.creature_alignment_id', 'alignment')
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

    private async createAction(actions: ActionsDto[]): Promise<Action[]> {
        let actionsCreated: Action[] = []

        for(let action of actions) {
            actionsCreated.push(await this.actionsRepo.create(action))
        }

        return actionsCreated
    }

    private async createAbility(abilities: CreateAbilityDto[]): Promise<Ability[]> {
        let abilitiesCreated: Ability[] = []

        for(let ability of abilities) {
            abilitiesCreated.push(await this.abilityRepo.create(ability))
        }

        return abilitiesCreated
    }
}
