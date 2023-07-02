import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreatureService} from "../services/creature.service";
import {CreateMainCreatureDto} from "../dtos/create-main-creature.dto";
import {CreateAdditionsCreatureDto} from "../dtos/create-additions-creature.dto";

@Controller('creature')
export class CreatureController {

    constructor(private creatureService: CreatureService) {
    }

    @Get('/:id')
    getOneCreature(@Param('id') id: number) {
        return this.creatureService.findOne(id)
    }

    @Post()
    addCreature(@Body('main_part') body_main: CreateMainCreatureDto, @Body('additional_part') body_additional: CreateAdditionsCreatureDto) {
        return this.creatureService.create(body_main, body_additional)
    }
}
