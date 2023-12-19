import {Injectable} from "@nestjs/common";
import {CreateAttributeDto} from "../dtos/create-attribute.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Attribute} from "../entities/attribute.entity";
import {Repository} from "typeorm";
import {Translation} from "../entities/translation.entity";

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
            attribute.attr_cat = body.attr_cat
        } else {
            attribute = this.attributeRepository.create()
            attribute.attr_cat = body.attr_cat

            const attribute_translation = this.translationRepository.create()

            attribute_translation.en = body.name.en
            attribute_translation.ua = body.name.ua
            attribute.name = await this.translationRepository.save(attribute_translation)
        }

        await this.attributeRepository.save(attribute)

        return attribute
    }

    deleteAttribute(id: number) {
        
    }
}