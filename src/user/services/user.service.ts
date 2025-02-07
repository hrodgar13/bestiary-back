import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../auth/entities/user.entity";
import {Repository} from "typeorm";
import {UserProfile} from "../entities/user-profile.entity";
import {DungeonSubscription} from "../entities/dungeon.subscription";
import {UpdateProfileDto, UserProfileDto} from "../dtos/user-profile.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
        @InjectRepository(DungeonSubscription)
        private readonly subscriptionRepository: Repository<DungeonSubscription>
    ) {
    }

    async getUserProfile(userId: number): Promise<UserProfileDto> {
        const user = await this.userRepository.findOne({where: {id: userId}})

        if(!user) {
            throw new NotFoundException('User not found')
        }

        let userProfile = await this.userProfileRepository.findOne({where: {user: {id: userId}}, relations: ['user', 'subscription']})

        if(!userProfile) {
            userProfile = this.userProfileRepository.create({
                dateOfCreation: new Date(),
                user,
                subscription: await this.subscriptionRepository.findOne({where: {type: 'The Adventurer'}})
            })

            await this.userProfileRepository.save(userProfile)
        }

        let userSub = userProfile.subscription ? userProfile.subscription : null

        return {
            id: userProfile.id,
            avatarUrl: userProfile.avatarUrl,
            name: userProfile.name,
            email: user.email,
            dateOfCreation: userProfile.dateOfCreation,
            dateOfExpireSub: userProfile.dateOfExpireSub,
            subscription: userSub,
        }
    }

    async updateProfile(userId: number, payload: UpdateProfileDto): Promise<{message: string}> {
        const user = await this.userRepository.findOne({where: {id: userId}})

        if(!user) {
            throw new NotFoundException('User not found')
        }

        let userProfile = await this.userProfileRepository.findOne({where: {user: {id: userId}}, relations: ['user', 'subscription']})

        await this.userProfileRepository.update(userProfile.id, {...payload})

        return {message: 'success'}
    }
}
