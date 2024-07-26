import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UniverseListItemDto} from "../dtos/universe.dto";
import {Universe} from "../entities/universe.entity";
import {UserProfile} from "../entities/user-profile.entity";
import {CreateUniverseDto} from "../dtos/user-profile.dto";

@Injectable()
export class UniverseService {
    constructor(
        @InjectRepository(Universe)
        private readonly universeRepository: Repository<Universe>,
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {
    }

    async getUniverseList(userId: number): Promise<UniverseListItemDto[]> {
        const universes = await this.universeRepository.find({where: {userProfile: {user: {id: userId}}}, relations: ['userProfile', 'userProfile.user']})

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

    async createUniverse(userId: number) :Promise<CreateUniverseDto> {
        const userProfile = await this.userProfileRepository.findOne({where: {user: {id: userId}}, relations: ['user']})

        const universe = this.universeRepository.create({
            userProfile: userProfile,
            filterCategories: []
        })

        await this.universeRepository.save(universe)

        return {id: universe.id}
    }

    async getUniverseById(sub: number, id: number) {
        const universe = await this.universeRepository.findOne({where: {userProfile: {user: {id: sub}}}, relations: ['userProfile', 'userProfile.user']})

        delete universe.userProfile

        return universe
    }
}
