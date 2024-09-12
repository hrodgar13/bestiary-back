import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from "typeorm";
import {
    UniverseCategoryDto, UniverseCategoryItemDto,
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
        @InjectRepository(UniverseCategory)
        private readonly universeCategoryRepository: Repository<UniverseCategory>,
        @InjectRepository(UniverseCategoryItem)
        private readonly universeCategoryItemRepository: Repository<UniverseCategoryItem>
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
                userProfile: {user: {id: sub}}, id
            },
            relations: ['userProfile', 'userProfile.user', 'hat', 'hat.description', 'categories']
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

        if (!universe) {
            throw new HttpException('Error of founding universe', HttpStatus.BAD_REQUEST)
        }

        const category = this.universeCategoryRepository.create({
            title: payload.title,
            universe
        })

        return this.universeCategoryRepository.save(category)
    }

    async updateCategory(userId: number, universeId: number, payload: UniverseCategoryDto) {
        if (!payload.id) {
            throw new HttpException('Category id undefined', HttpStatus.BAD_REQUEST)
        }

        const category = await this.universeCategoryRepository.findOne({
            where: {id: payload.id, universe: {id: universeId, userProfile: {user: {id: userId}}}},
            relations: ['universe', 'universe.userProfile', 'universe.userProfile.user']
        })

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }

        return this.universeCategoryRepository.update(category.id, {title: payload.title})
    }

    async createCategoryItem(userId: number, universeId: number, categoryId: number, payload: UniverseCategoryItemDto) {
        const category = await this.universeCategoryRepository.findOne({
            where: {id: categoryId, universe: {id: universeId, userProfile: {user: {id: userId}}}},
            relations: ['universe', 'universe.userProfile', 'universe.userProfile.user']
        })

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }

        let categoryItem: UniverseCategoryItem

        if (payload.id) {
            categoryItem = await this.universeCategoryItemRepository.findOne({
                where: {id: payload.id, category: {id: category.id}},
                relations: ['category', 'information']
            })

            if(!categoryItem) {
                throw new HttpException('Error of founding category item to editing', HttpStatus.NOT_FOUND)
            }

            for (const item of categoryItem.information) {
                await this.paragraphRepository.delete(item.id)
            }

            categoryItem.title = payload.title
            categoryItem.information = await this.paragraphRepository.save(payload.information)
        } else {
            const information = await this.paragraphRepository.save(payload.information)

            categoryItem = this.universeCategoryItemRepository.create({
                category,
                title: payload.title,
                information
            })
        }



        return this.universeCategoryItemRepository.save(categoryItem)
    }

    async getCategoryItems(userId: number, universeId: number, categoryId: number, page: number = 1, title: string|null = null) { // Calculate offset for pagination
        const perPage = 10
        const offset = (page - 1) * perPage;

        // Build the query with pagination and filtering by title
        const query = this.universeCategoryItemRepository.createQueryBuilder('categoryItem')
            .leftJoin('categoryItem.category', 'category')
            .leftJoinAndSelect('categoryItem.information', 'information')
            .andWhere('category.id = :categoryId', {categoryId})
            .leftJoin('category.universe', 'universe')
            .andWhere('universe.id = :universeId', {universeId})
            .leftJoin('universe.userProfile', 'profile')
            .leftJoin('profile.user', 'user')
            .andWhere('user.id = :userId', {userId})

        if (title) {
            query.andWhere('categoryItem.title LIKE :title', { title: `%${title}%` });
        }

        // Get total count for pagination
        const [items, total] = await query
            .skip(offset)
            .take(perPage)
            .getManyAndCount();

        return {
            total,
            items,
            page,
            totalPages: Math.ceil(total / perPage),
        };
    }

    async getCategoryItemById(userId: number, universeId: number, categoryId: number, itemId: number): Promise<UniverseCategoryItem> {
        const categoryItem = await this.universeCategoryItemRepository.findOne({where: {
            id: itemId,
            category: {
                id: categoryId, universe: {
                    id: universeId, userProfile: {user: {
                        id: userId
                    }}
                }},
            }, relations: [
                'information',
                'category',
                'category.universe',
                'category.universe.userProfile',
                'category.universe.userProfile.user'
            ]
        })

        delete categoryItem.category

        return categoryItem
    }
}
