import {Injectable} from "@nestjs/common";
import {CreateCreatureDto} from "../dtos/create-creature.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../entities/creature.entity";
import {Repository} from "typeorm";
import {Translation} from "../entities/translation.entity";
import {generate} from "rxjs";
import {CreateMeasureDto} from "../dtos/create-measure.dto";
import {Measure} from "../entities/measure.entity";
import {Attribute} from "../entities/attribute.entity";
import {CreateActionAbilityDto} from "../dtos/create-action-ability.dto";
import {ActionsAbilities} from "../entities/actions-abilities.entity";
import {StatBlock} from "../entities/stat-block.entity";

@Injectable()
export class CreatureService {
    constructor(
        @InjectRepository(Creature) private readonly creatureRepository: Repository<Creature>,
        @InjectRepository(Translation) private readonly translationRepo: Repository<Translation>,
        @InjectRepository(Measure) private readonly measureRepo: Repository<Measure>,
        @InjectRepository(Attribute) private readonly attributeRepo: Repository<Attribute>,
        @InjectRepository(ActionsAbilities) private readonly actionAbilityRepo: Repository<ActionsAbilities>,
        @InjectRepository(StatBlock) private readonly statBlockRepo: Repository<StatBlock>,
    ) {
    }


    async createBeast(createBeast: CreateCreatureDto) {
        const creature = this.creatureRepository.create()

        creature.name = await this.translationRepo.save(createBeast.name)
        creature.description = createBeast.description
        creature.armor_class = createBeast.armor_class
        creature.hits = createBeast.hits
        creature.experience = createBeast.experience
        creature.isFinished = createBeast.isFinished
        creature.danger_lvl = createBeast.danger_lvl
        creature.hits_in_dice = createBeast.hits_in_dice
        creature.mastery_bonus = createBeast.mastery_bonus

        creature.measures = await this.generateCreatureMeasures(createBeast.measures)

        creature.attributes = await this.attributeRepo.createQueryBuilder('attribute')
            .where('attribute.id IN (:...attributeIds)', {attributeIds: createBeast.attributes})
            .getMany()

        creature.action_abilities = await this.generateCreatureAbilities(createBeast.action_abilities)

        creature.stat_block = await this.statBlockRepo.save(createBeast.stat_block)

        creature.description = await this.translationRepo.save(createBeast.description)

        return await this.creatureRepository.save(creature)
    }

    private async generateCreatureMeasures(measures: CreateMeasureDto[]): Promise<Measure[]>  {
        let measureList: Measure[] = []

        for (const measure of measures) {
            const measureListItem = this.measureRepo.create({
                id: measure.id ? measure.id : null,
                amt: measure.amt,
                measure_cat: measure.measure_cat,
                isMeasureEnable: measure.isMeasureEnable,
                attribute: await this.attributeRepo.findOne({where: {id: measure.attribute}})
            })

            await this.measureRepo.save(measureListItem)

            measureList.push(measureListItem)
        }

        return measureList;
    }

    private async generateCreatureAbilities(action_abilities: CreateActionAbilityDto[]): Promise<ActionsAbilities[]> {
        const actionAbilitiesList: ActionsAbilities[] = []

        for(let actionAbility of action_abilities) {

            const actionAbilityListItem: ActionsAbilities = this.actionAbilityRepo.create({
                id: actionAbility.id,
                action_type: actionAbility.action_type,
                title: await this.translationRepo.save(actionAbility.title),
                description: await this.translationRepo.save(actionAbility.description)
            })

            await this.actionAbilityRepo.save(actionAbilityListItem)

            actionAbilitiesList.push(actionAbilityListItem)

        }

        return actionAbilitiesList;
    }

    async patchBeast(body: CreateCreatureDto, id: number) {
        const creature = await this.creatureRepository.findOne({where: {id}, relations: ['stat_block', 'measures', 'name', 'attributes', 'action_abilities', 'description', 'attributes.name', 'measures.attribute', 'measures.attribute.name', 'action_abilities.title', 'action_abilities.description']})

        await this.clearOldProperties(creature)
        return await this.createBeast(body)
    }

    private async clearOldProperties(creature: Creature) {
        for(let measure of creature.measures) {
            await this.measureRepo.delete(measure.id)
        }

        for(let action of creature.action_abilities) {
            await this.actionAbilityRepo.delete(action.id)
        }

        await this.statBlockRepo.delete(creature.stat_block.id)

        await this.translationRepo.delete(creature.name)

        await this.translationRepo.delete(creature.description)
    }
}