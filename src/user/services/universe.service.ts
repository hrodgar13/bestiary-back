import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from "typeorm";
import {
    UniverseCategoryDto,
    UniverseHatDto,
    UniverseListItemDto,
    UniverseStructureParagraphDto
} from "../dtos/universe.dto";
import {Universe} from "../entities/universe.entity";
import {UserProfile} from "../entities/user-profile.entity";
import {CreateUniverseDto} from "../dtos/user-profile.dto";
import {UniverseStructureParagraph} from "../entities/universe-stucture-paragraph.entity";
import {UniverseHat} from "../entities/universe-hat.entity";
import {UniverseCategory} from "../entities/universe-category.entity";

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
        @InjectRepository(UniverseCategory)
        private readonly universeCategoryRepository: Repository<UniverseCategory>
    ) {
    }

    async getUniverseList(userId: number): Promise<UniverseListItemDto[]> {
        const universes = await this.universeRepository.find({
            where: {userProfile: {user: {id: userId}}},
            relations: ['userProfile', 'userProfile.user', 'hat']
        })

        let universeList: UniverseListItemDto[] = []
        universes.forEach(item => {
            console.log(item.hat)
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
            where: {
                userProfile: {user: {id: sub}}, id},
            relations: ['userProfile', 'userProfile.user', 'hat', 'hat.description', 'categories', ]
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

    async createCategory(userId: number, universeId: number, payload: UniverseCategoryDto) {
        const universe = await this.universeRepository.findOne({
            where: {id: universeId, userProfile: {user: {id: userId}}},
            relations: ['userProfile', 'userProfile.user']
        })

        if(!universe) {
            throw new HttpException('Error of founding universe', HttpStatus.BAD_REQUEST)
        }

        const category = this.universeCategoryRepository.create({
            title: payload.title,
            universe
        })

        return this.universeCategoryRepository.save(category)
    }

    async updateCategory(userId: number, universeId: number, payload: UniverseCategoryDto) {
        if(!payload.id) {
            throw new HttpException('Category id undefined', HttpStatus.BAD_REQUEST)
        }

        const category = await this.universeCategoryRepository.findOne({
            where: {id: payload.id, universe: {id: universeId, userProfile: {user: {id: userId}}}},
            relations: ['universe', 'universe.userProfile', 'universe.userProfile.user']
        })

        if(!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }

        return this.universeCategoryRepository.update(category.id, {title: payload.title})
    }
}
