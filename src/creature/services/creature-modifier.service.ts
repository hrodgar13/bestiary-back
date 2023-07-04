import {CreateFeelModifiersDto} from "../dtos/creature-modifier.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {FeelModifiers} from "../entities/feels-modifier.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Feel} from "../entities/feel.entity";

@Injectable()
export class CreatureModifierService {

    constructor(
        @InjectRepository(FeelModifiers) private feelModifiersRepo: Repository<FeelModifiers>,
        @InjectRepository(Feel) private  feelRepo: Repository<Feel>
    ) {
    }

    async createFeelModifier(body: CreateFeelModifiersDto) {
        const feelModifier = this.feelModifiersRepo.create(body);

        feelModifier.feel_name_id = body.feelNameIdId

        console.log(feelModifier)

        return this.feelModifiersRepo.save(feelModifier)
    }
}