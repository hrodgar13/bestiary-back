import {Injectable} from '@nestjs/common';
import {CreaturePayloadDto} from "../../dtos/income/creature.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../../entities/creature.entity";
import {Repository} from "typeorm";
import {ImmunitiesDamageMeasure} from "../../entities/attribute-measure/immunities-damage-measure.entity";
import {MultiFieldsENUM, MutliSelectDto} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {VulnerabilitiesDamageMeasure} from "../../entities/attribute-measure/vulnerabilities-damage-measure.entity";
import {ResistsDamageMeasure} from "../../entities/attribute-measure/resists-damage-measure.entity";
import {SpeedsMeasure} from "../../entities/attribute-measure/speeds-measure.entity";
import {FeelingsMeasure} from "../../entities/attribute-measure/feelings-measure.entity";
import {SavingThrowMeasure} from "../../entities/attribute-measure/saving-throw-measure.entity";
import {SkillsMeasure} from "../../entities/attribute-measure/skills.measure";
import {ConditionsMeasure} from "../../entities/attribute-measure/conditions-measure.entity";
import {LanguagesMeasure} from "../../entities/attribute-measure/languages.measure";
import {RegionsMeasure} from "../../entities/attribute-measure/regions-measure.entity";
import {AdditionService} from "../addition/addition.service";
import {Damage} from "../../entities/attributes/damage.entity";
import {Speed} from "../../entities/attributes/speed.entity";
import {Feeling} from "../../entities/attributes/feeling.entity";
import {SavingThrow} from "../../entities/attributes/saving-throw.entity";
import {Skill} from "../../entities/attributes/skill.entity";
import {Condition} from "../../entities/attributes/condition.entity";
import {Language} from "../../entities/attributes/language.entity";
import {Region} from "../../entities/attributes/region.entity";
import {Alignment} from "../../entities/attributes/alignment.entity";
import {Type} from "../../entities/attributes/type.entity";
import {Size} from "../../entities/attributes/size.entity";
import {ArmorTag} from "../../entities/attributes/armor-tag.entity";
import {Translation} from "../../entities/translations/translation.entity";
import {ActionsAbilitiesENUM, ActionsAndAbilitiesAmount} from "../../dtos/income/actions/action-ability-block.dto";
import {Ability} from "../../entities/actions-abilities/abilities.entity";
import {Action} from "../../entities/actions-abilities/action.entity";
import {BonusAction} from "../../entities/actions-abilities/bonus-action.entity";
import {LegendaryAction} from "../../entities/actions-abilities/legendary-action.entity";
import {CreatureListDto} from "../../dtos/outcome/creature-list.dto";

@Injectable()
export class CreatureService {

    constructor(
        @InjectRepository(Creature) private creatureRepo: Repository<Creature>,
        @InjectRepository(ImmunitiesDamageMeasure) private immunityDamageMeasureRepo: Repository<ImmunitiesDamageMeasure>,
        @InjectRepository(VulnerabilitiesDamageMeasure) private vulnerabilityDamageMeasureRepo: Repository<VulnerabilitiesDamageMeasure>,
        @InjectRepository(SpeedsMeasure) private speedMeasureRepo: Repository<SpeedsMeasure>,
        @InjectRepository(ResistsDamageMeasure) private resistDamageMeasureRepo: Repository<ResistsDamageMeasure>,
        @InjectRepository(FeelingsMeasure) private feelingMeasureRepo: Repository<FeelingsMeasure>,
        @InjectRepository(SavingThrowMeasure) private savingThrowMeasureRepo: Repository<SavingThrowMeasure>,
        @InjectRepository(SkillsMeasure) private skillMeasureRepo: Repository<SkillsMeasure>,
        @InjectRepository(ConditionsMeasure) private conditionMeasureRepo: Repository<ConditionsMeasure>,
        @InjectRepository(LanguagesMeasure) private languageMeasureRepo: Repository<LanguagesMeasure>,
        @InjectRepository(RegionsMeasure) private regionMeasureRepo: Repository<RegionsMeasure>,
        @InjectRepository(Damage) private damageRepo: Repository<Damage>,
        @InjectRepository(Speed) private speedRepo: Repository<Speed>,
        @InjectRepository(Feeling) private feelingRepo: Repository<Feeling>,
        @InjectRepository(SavingThrow) private savingThrowsRepo: Repository<SavingThrow>,
        @InjectRepository(Skill) private skillsRepo: Repository<Skill>,
        @InjectRepository(Condition) private conditionsImmunitiesRepo: Repository<Condition>,
        @InjectRepository(Language) private languagesRepo: Repository<Language>,
        @InjectRepository(Region) private regionsRepo: Repository<Region>,
        @InjectRepository(Alignment) private alignmentRepo: Repository<Alignment>,
        @InjectRepository(Type) private typeRepo: Repository<Type>,
        @InjectRepository(Size) private sizeRepo: Repository<Size>,
        @InjectRepository(ArmorTag) private armorTagRepo: Repository<ArmorTag>,
        @InjectRepository(Translation) private translationRepo: Repository<Translation>,
        @InjectRepository(Ability) private abilityRepo: Repository<Ability>,
        @InjectRepository(Action) private actionRepo: Repository<Action>,
        @InjectRepository(BonusAction) private bonusActionRepository: Repository<BonusAction>,
        @InjectRepository(LegendaryAction) private legendaryActionRepo: Repository<LegendaryAction>,
        private additionMeasure: AdditionService
    ) {
    }

    async createOrPatchCreature(userId: any, body: CreaturePayloadDto, id: number | null = null) {
        let creature: Creature

        if(id) {
            creature = await this.creatureRepo.findOne({where: {id}})
        }
        else {
            creature = this.creatureRepo.create()
        }

        creature.isFinished = body.isFinished

        creature.creatureName = await this.translationRepo.save(body.creatureName)

        creature.alignment = await this.alignmentRepo.findOne({where: {id: body.alignment}})
        creature.type = await this.typeRepo.findOne({where: {id: body.type}})
        creature.size = await this.sizeRepo.findOne({where: {id: body.size}})
        creature.armorClass = body.armorClass
        creature.armorTag = await this.armorTagRepo.findOne({where: {id: body.armorTag}})
        creature.hits = body.hits
        creature.hitsInDice = body.hitsInDice
        creature.strength = body.strength
        creature.dexterity = body.dexterity
        creature.construction = body.construction
        creature.intelligence = body.intelligence
        creature.wisdom = body.wisdom
        creature.charisma = body.charisma
        creature.dangerLevel = body.dangerLevel
        creature.experience = body.experience
        creature.masteryBonus = body.masteryBonus
        creature.description = await this.translationRepo.save(body.description)


        creature = await this.assetMultiselectData(creature, body.multiSelects)

        creature = await this.assetActionsAbilitiesData(creature, body.actionsAbilities)

        return this.creatureRepo.save(creature)
    }

    private async assetMultiselectData(creature: Creature, multiSelects: MutliSelectDto): Promise<Creature> {
        for (let select of Object.keys(multiSelects)) {
            const body = multiSelects[select]

            if (select == MultiFieldsENUM.vulnerabilities) {
                creature[MultiFieldsENUM.vulnerabilities] = await this.writeMeasureAttribute<VulnerabilitiesDamageMeasure, Damage>(body, select, this.vulnerabilityDamageMeasureRepo, this.damageRepo)
            }
            if (select == MultiFieldsENUM.immunities) {
                creature[MultiFieldsENUM.immunities] = await this.writeMeasureAttribute<ImmunitiesDamageMeasure, Damage>(body, select, this.immunityDamageMeasureRepo, this.damageRepo)
            }
            if (select == MultiFieldsENUM.speeds) {
                creature[MultiFieldsENUM.speeds] = await this.writeMeasureAttribute<SpeedsMeasure, Speed>(body, select, this.speedMeasureRepo, this.speedRepo)
            }
            if (select == MultiFieldsENUM.resists) {
                creature[MultiFieldsENUM.resists] = await this.writeMeasureAttribute<ResistsDamageMeasure, Damage>(body, select, this.resistDamageMeasureRepo, this.damageRepo)
            }
            if (select == MultiFieldsENUM.feelings) {
                creature[MultiFieldsENUM.feelings] = await this.writeMeasureAttribute<FeelingsMeasure, Feeling>(body, select, this.feelingMeasureRepo, this.feelingRepo)
            }
            if (select == MultiFieldsENUM.savingThrows) {
                creature[MultiFieldsENUM.savingThrows] = await this.writeMeasureAttribute<SavingThrowMeasure, SavingThrow>(body, select, this.savingThrowMeasureRepo, this.savingThrowsRepo)
            }
            if (select == MultiFieldsENUM.skills) {
                creature[MultiFieldsENUM.skills] = await this.writeMeasureAttribute<SkillsMeasure, Skill>(body, select, this.skillMeasureRepo, this.skillsRepo)
            }
            if (select == MultiFieldsENUM.conditionsImmunities) {
                creature[MultiFieldsENUM.conditionsImmunities] = await this.writeMeasureAttribute<ConditionsMeasure, Condition>(body, select, this.conditionMeasureRepo, this.conditionsImmunitiesRepo)
            }
            if (select == MultiFieldsENUM.languages) {
                creature[MultiFieldsENUM.languages] = await this.writeMeasureAttribute<LanguagesMeasure, Language>(body, select, this.languageMeasureRepo, this.languagesRepo)
            }
            if (select == MultiFieldsENUM.regions) {
                creature[MultiFieldsENUM.regions] = await this.writeMeasureAttribute<RegionsMeasure, Region>(body, select, this.regionMeasureRepo, this.regionsRepo)
            }
        }

        return creature
    }

    private async assetActionsAbilitiesData(creature: Creature, actionsAbilities: ActionsAndAbilitiesAmount) {
        for (let select of Object.keys(actionsAbilities)) {
            if (select == ActionsAbilitiesENUM.abilities) {
                creature[ActionsAbilitiesENUM.abilities] = await this.writeAbilityAction(select, actionsAbilities, this.abilityRepo)
            }
            if (select == ActionsAbilitiesENUM.actions) {
                creature[ActionsAbilitiesENUM.actions] = await this.writeAbilityAction(select, actionsAbilities, this.actionRepo)
            }
            if (select == ActionsAbilitiesENUM.bonusActions) {
                creature[ActionsAbilitiesENUM.bonusActions] = await this.writeAbilityAction(select, actionsAbilities, this.bonusActionRepository)
            }
            if (select == ActionsAbilitiesENUM.legendaryActions) {
                creature[ActionsAbilitiesENUM.legendaryActions] = await this.writeAbilityAction(select, actionsAbilities, this.legendaryActionRepo)
            }

        }

        return creature;
    }

    private async writeMeasureAttribute<Measure, Attribute>(body: any, select: MultiFieldsENUM, repositoryMeasure: Repository<Measure>, attributeRepo: Repository<Attribute>): Promise<Measure[]> {
        let list: Measure[] = []

        for (let measureAttribute of body) {
            const entity = repositoryMeasure.create()
            entity['attribute'] = await this.additionMeasure.getOne(measureAttribute.attributeId, attributeRepo)

            if (measureAttribute.isMeasureEnable) {
                entity['isMeasureEnable'] = measureAttribute.msr
            }

            if (measureAttribute.amt) {
                entity['amt'] = measureAttribute.amt
            }

            await repositoryMeasure.save(entity)

            list.push(entity)
        }

        return list
    }

    private async writeAbilityAction(select: ActionsAbilitiesENUM, actionsAbilities: ActionsAndAbilitiesAmount, repo: Repository<Action | Ability | BonusAction | LegendaryAction>) {

        const body = actionsAbilities[select]

        let list = []

        for (let item of body) {
            const entity = repo.create(item)

            await repo.save(entity)

            list.push(entity)
        }

        return list
    }

    async getCreaturesList(isFinished: boolean = true): Promise<CreatureListDto[]> {
        let beastList: CreatureListDto[] = []

        let query =  this.creatureRepo.createQueryBuilder('creature')
            .leftJoinAndSelect('creature.creatureName', 'name')
            .orderBy('creature.dangerLevel', 'ASC')

        if(isFinished) {
            query = query.andWhere(`creature.isFinished IS TRUE`)
        } else {
            query = query.andWhere(`creature.isFinished IS NOT TRUE`)
        }

        const list: Creature[] = await query.getMany()

        list.forEach(beast => {
            const isDangLvlExist = beastList.findIndex(item => item.creatureDangerLvl === beast.dangerLevel)

            if (isDangLvlExist === -1) {
                beastList.push({
                    creatureDangerLvl: beast.dangerLevel,
                    creatures: [
                        {
                            creatureName: beast.creatureName,
                            id: beast.id
                        }
                    ]
                })
            } else {
                beastList[isDangLvlExist].creatures.push({
                    creatureName: beast.creatureName,
                    id: beast.id
                })
            }
        })

        return beastList
    }

    async getCreatureById(id: number) {
        let query = this.creatureRepo.createQueryBuilder('creature')
            .andWhere('creature.id = :id', {id})
            .leftJoinAndSelect('creature.creatureName', 'nameTranslations')
            .leftJoinAndSelect('creature.alignment', 'alignment')
            .leftJoinAndSelect('alignment.attrName', 'alTranslation')
            .leftJoinAndSelect('creature.type', 'type')
            .leftJoinAndSelect('type.attrName', 'typeT')
            .leftJoinAndSelect('creature.size', 'size')
            .leftJoinAndSelect('size.attrName', 'sizeT')
            .leftJoinAndSelect('creature.armorTag', 'armorTag')
            .leftJoinAndSelect('armorTag.attrName', 'armorTagT')
            .leftJoinAndSelect('creature.description', 'descriptionT')

        for (let key of Object.keys(MultiFieldsENUM)) {
            query = query.leftJoinAndSelect(`creature.${key}`, key)
                .leftJoinAndSelect(`${key}.attribute`, `${key}Attribute`)
                .leftJoinAndSelect(`${key}Attribute.attrName`, `${key}attrNameT`)
        }

        for (let key of Object.keys(ActionsAbilitiesENUM)) {
            query = query.leftJoinAndSelect(`creature.${key}`, key)
                .leftJoinAndSelect(`${key}.title`, `${key}titleT`)
                .leftJoinAndSelect(`${key}.description`, `${key}descriptionT`)
        }

        const creature = await query.getOne()

        return creature
    }
}
