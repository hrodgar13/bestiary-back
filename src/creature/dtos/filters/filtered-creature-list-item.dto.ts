import {Translation} from "../../entities/translation.entity";

export class FilteredCreatureListItemDto {
    id: number
    creatureName: Translation
}

export class FilteredCreatureListDto {
    dangerLvl: number
    creature: FilteredCreatureListItemDto[]
}