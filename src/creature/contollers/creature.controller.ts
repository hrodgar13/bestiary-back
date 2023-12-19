import {Body, Controller, Post} from "@nestjs/common";
import {CreateCreatureDto} from "../dtos/create-creature.dto";
import {CreatureService} from "../services/creature.service";

@Controller('creature')
export class CreatureController {

    constructor(
        private creatureService: CreatureService
    ) {
    }
    @Post()
    createBeast(@Body() createBeast: CreateCreatureDto) {
        return this.creatureService.createBeast(createBeast)
    }
}