import {CreateMainCreatureDto} from "./create-main-creature.dto";
import {CreateAdditionsCreatureDto} from "./create-additions-creature.dto";

export class CreateCreatureDto {
    main_part: CreateMainCreatureDto;
    additional_part: CreateAdditionsCreatureDto;
}