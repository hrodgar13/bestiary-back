import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreatureService} from "../services/creature.service";
import {CreateMainCreatureDto} from "../dtos/create-main-creature.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {Roles} from "../../auth/decorators/roles.decorator";
import {RolesEnum} from "../../auth/roles/roles.enum";

@Controller('creature')
export class CreatureController {

    constructor(private creatureService: CreatureService) {
    }


    @Get('/:id')
    getOneCreature(@Param('id') id: number) {
        return this.creatureService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Post()
    addCreature(@Body('main_part') body: CreateMainCreatureDto) {
        return this.creatureService.create(body)
    }
}
