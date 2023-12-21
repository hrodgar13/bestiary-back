import {Body, Controller, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateCreatureDto} from "../dtos/creature/create/create-creature.dto";
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

    @Get('list')
    getCreaturesList(@Query('finished') finished: string ) {
        return this.creatureService.getCreaturesList(finished)
    }

    @Get('list/:id')
    getOneCreature(@Param('id') id: number) {
        return this.creatureService.getOneCreature(id)
    }
}