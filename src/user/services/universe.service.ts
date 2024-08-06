import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from "typeorm";
import {UniverseHatDto, UniverseListItemDto, UniverseStructureParagraphDto} from "../dtos/universe.dto";
import {Universe} from "../entities/universe.entity";
import {UserProfile} from "../entities/user-profile.entity";
import {CreateUniverseDto} from "../dtos/user-profile.dto";
import {UniverseStructureParagraph} from "../entities/universe-stucture-paragraph.entity";
import {UniverseHat} from "../entities/universe-hat.entity";
import {IMAGE_POSITIONS, STRUCTURE_PARAGRAPH_TYPES} from "../static/enums";
import {UniverseCategoryItem} from "../entities/universe-category-item.entity";

@Injectable()
export class UniverseService {
    constructor(
        @InjectRepository(Universe)
        private readonly universeRepository: Repository<Universe>,
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
        @InjectRepository(UniverseStructureParagraph)
        private readonly paragraphRepository: Repository<UniverseStructureParagraph>,
        @InjectRepository(UniverseHat)
        private readonly universeHatRepository: Repository<UniverseHat>,
    ) {
    }

    async getUniverseList(userId: number): Promise<UniverseListItemDto[]> {
        const universes = await this.universeRepository.find({
            where: {userProfile: {user: {id: userId}}},
            relations: ['userProfile', 'userProfile.user']
        })

        let universeList: UniverseListItemDto[] = []

        universes.forEach(item => {
            universeList.push({
                id: item.id,
                title: item.hat && item.hat.universeName ? item.hat.universeName : 'No Name',
                imageUrl: item.hat && item.hat.images[0] ? item.hat.images[0] : 'No Image',
                filterCategories: ['Unfinished Feature']
            })
        })

        return universeList
    }

    async createUniverse(userId: number): Promise<CreateUniverseDto> {
        const userProfile = await this.userProfileRepository.findOne({where: {user: {id: userId}}, relations: ['user']})

        const universe = this.universeRepository.create({
            userProfile: userProfile,
            filterCategories: []
        })

        await this.universeRepository.save(universe)

        return {id: universe.id}
    }

    async getUniverseById(sub: number, id: number) {
        const universe = await this.universeRepository.findOne({
            where: {userProfile: {user: {id: sub}}},
            relations: ['userProfile', 'userProfile.user']
        })

        delete universe.userProfile

        return universe
    }

    async createUniverseHat(userId: number, universeId: number, payload: UniverseHatDto) {
        const universe = await this.universeRepository.findOne({
            where: {
                id: universeId,
                userProfile: {user: {id: userId}}
            }, relations: ['userProfile', 'userProfile.user', 'hat', 'hat.description']
        })

        if (!universe) {
            throw new NotFoundException('Universe of user not found')
        }

        const oldParagraphs = universe.hat && universe.hat.description ? universe.hat.description : null

        const description = await this.createArrayOfParagraphs(payload.description, oldParagraphs)

        const hat = await this.universeHatRepository.save({
            ...payload, description
        })


        universe.hat = hat

        await this.universeRepository.save(universe)

        return {message: 'WORK'}
    }

    private async createArrayOfParagraphs(description: UniverseStructureParagraphDto[], existingParagraphs: UniverseStructureParagraph[] | null) {
        if (existingParagraphs) {
            for (let paragraph of existingParagraphs) {
                await this.paragraphRepository.delete(paragraph.id)
            }
        }

        return await this.paragraphRepository.save(description)
    }
}
