import {Column} from "typeorm";

export class UserProfileDto {
    id: number
    avatarUrl?: string
    name?: string
    email: string
    dateOfCreation: Date
    subscription?: DungeonMasterSubscriptionDto
    dateOfExpireSub?: Date
}

export interface DungeonMasterSubscriptionDto {
    id: number,
    type: string
    subPhotoUrl: string
}
