import {IMAGE_POSITIONS, STRUCTURE_PARAGRAPH_TYPES} from "../static/enums";
import {UniverseTag} from "../entities/tags.entity";

export class UniverseListItemDto {
    id: number
    title: string
    imageUrl: string
    filterCategories: UniverseTag[]
}

export class UniverseHatDto {
    id?: number
    universeName: string
    description: UniverseStructureParagraphDto[]
    images: string[]
    imagePosition: IMAGE_POSITIONS
}

export interface UniverseStructureParagraphDto {
    id?: number
    order: number
    title: string
    type: STRUCTURE_PARAGRAPH_TYPES
    metadata: JSON
}

export interface UniverseCategoryDto {
    id?: number
    title: string
}

export interface UniverseCategoryItemDto {
    id?: number
    title: string
    information: UniverseStructureParagraphDto[]
}
