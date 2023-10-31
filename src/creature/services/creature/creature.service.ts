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
import {rethrow} from "@nestjs/core/helpers/rethrow";

@Injectable()
export class CreatureService {

    constructor(
        @InjectRepository(Creature) private creatureRepo: Repository<Creature>,
        @InjectRepository(ImmunitiesDamageMeasure) private immunityDamageMeasureRepo: Repository<ImmunitiesDamageMeasure>,
        @InjectRepository(VulnerabilitiesDamageMeasure) private vulnerabilityDamageMeasureRepo: Repository<VulnerabilitiesDamageMeasure>,
        @InjectRepository(SpeedsMeasure) private speedDamageMeasureRepo: Repository<SpeedsMeasure>,
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

    async createCreature(userId: any, body: CreaturePayloadDto) {
        let creature = this.creatureRepo.create()

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

        console.log(creature)

        return this.creatureRepo.save(creature)
    }

    private async assetMultiselectData(creature: Creature, multiSelects: MutliSelectDto): Promise<Creature> {
        for (let select of Object.keys(multiSelects)) {

            if (select == MultiFieldsENUM.vulnerabilities) {
                const body = multiSelects[select]

                let list: VulnerabilitiesDamageMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.vulnerabilityDamageMeasureRepo.create()
                    entity[MultiFieldsENUM.vulnerabilities] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.damageRepo)

                    await this.vulnerabilityDamageMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.vulnerabilities] = list
            }
            if (select == MultiFieldsENUM.immunities) {
                const body = multiSelects[select]

                let list: ImmunitiesDamageMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.immunityDamageMeasureRepo.create()
                    entity[MultiFieldsENUM.immunities] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.damageRepo)

                    await this.immunityDamageMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.immunities] = list
            }
            if (select == MultiFieldsENUM.speeds) {
                const body = multiSelects[select]

                let list: SpeedsMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.speedDamageMeasureRepo.create()
                    entity[MultiFieldsENUM.speeds] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.speedRepo)
                    entity.amt = measureAttribute.amt

                    await this.speedDamageMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.speeds] = list
            }
            if (select == MultiFieldsENUM.resists) {
                const body = multiSelects[select]

                let list: ResistsDamageMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.resistDamageMeasureRepo.create()
                    entity[MultiFieldsENUM.resists] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.damageRepo)

                    await this.resistDamageMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.resists] = list
            }
            if (select == MultiFieldsENUM.feelings) {
                const body = multiSelects[select]

                let list: FeelingsMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.feelingMeasureRepo.create()

                    entity[MultiFieldsENUM.feelings] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.feelingRepo)
                    entity.isMeasureEnable = measureAttribute.msr
                    entity.amt = measureAttribute.amt

                    await this.feelingMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.feelings] = list
            }
            if (select == MultiFieldsENUM.savingThrows) {
                const body = multiSelects[select]

                let list: SavingThrowMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.savingThrowMeasureRepo.create()

                    entity[MultiFieldsENUM.savingThrows] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.savingThrowsRepo)
                    entity.amt = measureAttribute.amt

                    await this.savingThrowMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.savingThrows] = list
            }
            if (select == MultiFieldsENUM.skills) {
                const body = multiSelects[select]

                let list: SkillsMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.skillMeasureRepo.create()

                    entity[MultiFieldsENUM.skills] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.skillsRepo)
                    entity.amt = measureAttribute.amt

                    await this.skillMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.skills] = list
            }
            if (select == MultiFieldsENUM.conditionsImmunities) {
                const body = multiSelects[select]

                let list: ConditionsMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.conditionMeasureRepo.create()

                    entity[MultiFieldsENUM.conditionsImmunities] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.conditionsImmunitiesRepo)

                    await this.conditionsImmunitiesRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.conditionsImmunities] = list
            }
            if (select == MultiFieldsENUM.languages) {
                const body = multiSelects[select]

                let list: LanguagesMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.languageMeasureRepo.create()

                    entity[MultiFieldsENUM.languages] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.languagesRepo)
                    entity.amt = measureAttribute.amt

                    await this.languageMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.languages] = list
            }
            if (select == MultiFieldsENUM.regions) {
                const body = multiSelects[select]

                let list: RegionsMeasure[] = []

                for(let measureAttribute of body) {
                    const entity = this.regionMeasureRepo.create()

                    entity[MultiFieldsENUM.regions] = await this.additionMeasure.getOne(measureAttribute.attributeId, this.regionsRepo)

                    await this.regionMeasureRepo.save(entity)

                    list.push(entity)
                }

                creature[MultiFieldsENUM.regions] = list
            }

        }

        return creature
    }

    private async assetActionsAbilitiesData(creature: Creature, actionsAbilities: ActionsAndAbilitiesAmount) {
        for (let select of Object.keys(actionsAbilities)) {
            if(select == ActionsAbilitiesENUM.abilities) {
                const body = actionsAbilities[ActionsAbilitiesENUM.abilities]

                let list: Ability[] = []

                for (let item of  body) {
                    const entity = this.abilityRepo.create(item)

                    await this.abilityRepo.save(entity)

                    list.push(entity)
                }

                creature[ActionsAbilitiesENUM.abilities] = list
            }
            if(select == ActionsAbilitiesENUM.actions) {
                const body = actionsAbilities[ActionsAbilitiesENUM.actions]

                let list: Action[] = []

                for (let item of  body) {
                    const entity = this.actionRepo.create(item)

                    await this.actionRepo.save(entity)

                    list.push(entity)
                }

                creature[ActionsAbilitiesENUM.actions] = list
            }
            if(select == ActionsAbilitiesENUM.bonusActions) {
                const body = actionsAbilities[ActionsAbilitiesENUM.bonusActions]

                let list: BonusAction[] = []

                for (let item of  body) {
                    const entity = this.bonusActionRepository.create(item)

                    await this.bonusActionRepository.save(entity)

                    list.push(entity)
                }

                creature[ActionsAbilitiesENUM.bonusActions] = list
            }
            if(select == ActionsAbilitiesENUM.legendaryActions) {
                const body = actionsAbilities[ActionsAbilitiesENUM.legendaryActions]

                let list: LegendaryAction[] = []

                for (let item of  body) {
                    const entity = this.legendaryActionRepo.create(item)

                    await this.legendaryActionRepo.save(entity)

                    list.push(entity)
                }

                creature[ActionsAbilitiesENUM.legendaryActions] = list
            }

        }

        return creature;
    }
}
