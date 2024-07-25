
export class UserProfileDto {
    id: number
    avatarUrl?: string
    name?: string
    email: string
    dateOfCreation: Date
    subscription?: DungeonMasterSubscriptionDto
    dateOfExpireSub?: Date
}

export class DungeonMasterSubscriptionDto {
    id: number
    type: string
    subPhotoUrl: string
}

export class UpdateProfileDto {
    avatarUrl?: string
    name?: string
}
