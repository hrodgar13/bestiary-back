import {IMAGE_POSITIONS, STRUCTURE_PARAGRAPH_TYPES} from "../static/enums";

export class UniverseListItemDto {
    id: number
    title: string
    imageUrl: string
    filterCategories: string[]
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
