import {Translation} from "../../entities/translations/translation.entity";

export class CreatureListDto {
    creatureDangerLvl: number | null
    creatures: CreatureBody[]
}

export class CreatureBody {
    id: number
    creatureName: Translation
}