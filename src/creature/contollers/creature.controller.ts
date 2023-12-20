import {Body, Controller, Param, Patch, Post} from "@nestjs/common";
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

    @Patch(':id')
    patchBeast(@Param('id') id: number, @Body() body: CreateCreatureDto) {
        return this.creatureService.patchBeast(body, id)
    }
}