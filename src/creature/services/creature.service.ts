import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateCreatureDto} from "../dtos/creature/create/create-creature.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../entities/creature.entity";
import {Brackets, Repository} from "typeorm";
import {Translation} from "../entities/translation.entity";
import {CreateMeasureDto} from "../dtos/creature/create/create-measure.dto";
import {Measure} from "../entities/measure.entity";
import {Attribute} from "../entities/attribute.entity";
import {CreateActionAbilityDto} from "../dtos/creature/create/create-action-ability.dto";
import {ActionsAbilities} from "../entities/actions-abilities.entity";
import {StatBlock} from "../entities/stat-block.entity";
import {FilteredCreatureListDto} from "../dtos/filters/filtered-creature-list-item.dto";
import {FilteredCreatureDataMetaDto} from "../dtos/filters/filtered-creature.data-meta.dto";

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


    async createBeast(createBeast: CreateCreatureDto, creatureToUpdate: Creature | null = null) {
        let creature = this.creatureRepository.create()

        if (creatureToUpdate) {
            creature = creatureToUpdate
        }

        creature.name = await this.translationRepo.save(createBeast.name)
        creature.description = await this.translationRepo.save(createBeast.description)
        creature.armor_class = createBeast.armor_class
        creature.image = createBeast.image
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

        creature.stat_block = await this.statBlockRepo.save({
            id: creature.stat_block?.id || null,
            ...createBeast.stat_block,
        })

        creature.description = await this.translationRepo.save(createBeast.description)

        return await this.creatureRepository.save(creature)
    }

    async getCreaturesList(finished: string, perPage: number, search: string, queryParams: any): Promise<FilteredCreatureDataMetaDto> {
        let query = this.creatureRepository.createQueryBuilder('creature')
            .andWhere(`creature.isFinished IS ${finished}`)
            .leftJoinAndSelect('creature.name', 'name')
            .leftJoin('creature.attributes', 'attributes')
            .leftJoin('creature.measures', 'measures')
            .leftJoin('measures.attribute', 'msr_attr')
            .orderBy('creature.danger_lvl')

        if(search !== '') {
            query = query.andWhere(
                new Brackets(qb => {
                    qb.where('name.en like :search_en', {search_en: `%${search}%`})
                        .orWhere('name.ua like :search_ua', {search_ua: `%${search}%`});
                })
            );
        }

        for (const param of Object.keys(queryParams)) {
            if(param !== 'perPage' && param !== 'finished' && param !== 'search') {

                if(param === 'alignment' || param === 'size' || param === 'type') {
                    query = query.andWhere('attributes.attr_cat = :attr_cat AND attributes.id IN (:...attributesIds)', {attr_cat: param, attributesIds: queryParams[param].split(',')})
                } else {
                    query = query.andWhere('measures.measure_cat = :measure_cat AND measures.attribute.id IN (:...msrAttrIds)', {measure_cat: param, msrAttrIds:  queryParams[param].split(',')})
                }

            }
        }

        query = query.take(Number(perPage))

        const [creatures, count] = await query.getManyAndCount()

        let filteredCreature: FilteredCreatureListDto[] = []

        creatures.forEach(item => {
            const idx = filteredCreature.findIndex(dng => dng.dangerLvl === item.danger_lvl)

            const creature = {id: item.id, creatureName: item.name}

            if(idx === -1) {
                filteredCreature.push({
                    dangerLvl: item.danger_lvl,
                    creature: [creature]
                })
            } else {
                filteredCreature[idx].creature.push(creature)
            }
        })

        return {creatures: filteredCreature,total: count}
    }

    async getOneCreature(id: number) {
        return await this.creatureRepository.createQueryBuilder('creature')
            .andWhere('creature.id = :creatureId', {creatureId: id})
            .leftJoinAndSelect('creature.name', 'name')
            .leftJoinAndSelect('creature.stat_block', 'stat_block')
            .leftJoinAndSelect('creature.measures', 'measures')
            .leftJoinAndSelect('measures.attribute', 'msr_attribute')
            .leftJoinAndSelect('msr_attribute.name', 'msr_attr_name')
            .leftJoinAndSelect('creature.attributes', 'attributes')
            .leftJoinAndSelect('attributes.name', 'attr_name')
            .leftJoinAndSelect('creature.action_abilities', 'action_abilities')
            .leftJoinAndSelect('action_abilities.title', 'action_abilities_title')
            .leftJoinAndSelect('action_abilities.description', 'action_abilities_description')
            .leftJoinAndSelect('creature.description', 'description')
            .getOne()
    }

    async patchBeast(body: CreateCreatureDto, id: number) {
        const creature = await this.creatureRepository.findOne({
            where: {id},
            relations: ['stat_block', 'measures', 'name', 'attributes', 'action_abilities', 'description', 'attributes.name', 'measures.attribute', 'measures.attribute.name', 'action_abilities.title', 'action_abilities.description']
        })

        await this.clearOldProperties(creature)
        return await this.createBeast(body, creature)
    }

    private async generateCreatureMeasures(measures: CreateMeasureDto[]): Promise<Measure[]> {
        let measureList: Measure[] = []

        for (const measure of measures) {
            const measureListItem = this.measureRepo.create({
                id: measure.id ? measure.id : undefined,
                amt: Number(measure.amt),
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

        for (let actionAbility of action_abilities) {

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


    private async clearOldProperties(creature: Creature) {
        for (let measure of creature.measures) {
            await this.measureRepo.delete(measure.id)
        }
        for (let action of creature.action_abilities) {

            await this.actionAbilityRepo.delete(action.id)
            await this.translationRepo.delete(action.description.id)
            await this.translationRepo.delete(action.title.id)
        }
    }


    async deleteActionAbility(id: number): Promise<{message: string}> {
        const actionAbility = await this.actionAbilityRepo.findOne({where: {id}})

        if(!actionAbility) {
            throw new NotFoundException('Action or Ability not found')
        }

        await this.actionAbilityRepo.delete(id)

        return {message: 'Successfully deleted'}
    }
}
