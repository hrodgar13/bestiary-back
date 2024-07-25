import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UniverseListItemDto} from "../dtos/universe.dto";
import {Universe} from "../entities/universe.entity";

@Injectable()
export class UniverseService {
    constructor(
        @InjectRepository(Universe)
        private readonly universeRepository: Repository<Universe>,
    ) {
    }

    async getUniverseList(userId: number): Promise<UniverseListItemDto[]> {
        const universes = await this.universeRepository.find({where: {userProfile: {user: {id: userId}}}, relations: ['userProfile', 'userProfile.user']})

        let universeList: UniverseListItemDto[] = []

        universes.forEach(item => {
            universeList.push({
                id: item.id,
                title: item.hat.universeName,
                imageUrl: item.hat.images[0],
                filterCategories: ['Unfinished Feature']
            })
        })

        return universeList
    }
}
