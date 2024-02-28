import {Injectable} from "@nestjs/common";
import {CreateAttributeDto} from "../dtos/creature/create/create-attribute.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Attribute} from "../entities/attribute.entity";
import {Repository} from "typeorm";
import {Translation} from "../entities/translation.entity";
import {FiltersListDto} from "../dtos/filters/get-filters-list.dto";
import {FilterEnum} from "../../static/filter.enum";

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(Translation) private translationRepository: Repository<Translation>
    ) {
    }

    async getAllAttributesByCategory(category: string): Promise<Attribute[]> {
        const attributes = await this.attributeRepository.createQueryBuilder('attr')
            .andWhere('attr.attr_cat LIKE :category', {category})
            .leftJoinAndSelect('attr.name', 'translation')
            .getMany()

        return attributes
    }

    getOneAttribute(id: number) {
        
    }

    async createPatchAttribute(body: CreateAttributeDto, id: number | null = null): Promise<Attribute> {
        let attribute: Attribute

        if(id) {
            attribute = await this.attributeRepository.findOne({where: {id}, relations: ['name']})

            attribute.name.en = body.name.en
            attribute.name.ua = body.name.ua

            await this.translationRepository.update(attribute.name.id, {en: body.name.en, ua: body.name.ua})

        } else {
            attribute = this.attributeRepository.create()
            attribute.attr_cat = body.attr_cat

            const attribute_translation = this.translationRepository.create()

            attribute_translation.en = body.name.en
            attribute_translation.ua = body.name.ua
            attribute.name = await this.translationRepository.save(attribute_translation)

            await this.attributeRepository.save(attribute)
        }

        return attribute
    }

    async deleteAttribute(id: number) {
        await this.attributeRepository.delete(id)

        return {message: 'Item deleted successfully'}
    }

    async getAllAttributesSortedByCategory() {
        let attributesForFilter: FiltersListDto[] = []

        let attributes = await this.attributeRepository.find({relations: ['name']})

        attributes.forEach(attribute => {
            const persistCategoryIdx = attributesForFilter.findIndex(item => item.filter_cat === attribute.attr_cat)

            if(persistCategoryIdx === -1) {
                const newFilter: FiltersListDto = {
                    filter_cat: attribute.attr_cat,
                    filter_values: [attribute]
                }

                attributesForFilter.push(newFilter)
            } else {
                attributesForFilter[persistCategoryIdx].filter_values.push(attribute)
            }
        })

        attributesForFilter = this.convertDamageInIRV(attributesForFilter)

        return attributesForFilter
    }

    private convertDamageInIRV(attributes: FiltersListDto[]): FiltersListDto[] {
        if(attributes.length) {
            const attrIdx = attributes.findIndex(item => item.filter_cat === 'damage')

            if(attrIdx !== -1) {
                const attributeBody = attributes[attrIdx].filter_values

                attributes.splice(attrIdx, 1)

                Object.values(FilterEnum).forEach(item => {
                    attributes.push({
                        filter_cat: item,
                        filter_values: attributeBody
                    })
                })
            }
        }

        return  attributes
    }
}