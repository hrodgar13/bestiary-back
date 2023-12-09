import {Body, Controller, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {CreaturePayloadDto} from "../../dtos/income/creature.dto";
import {CreatureService} from "../../services/creature/creature.service";
import {JwtAuthGuard} from "../../../auth/guards/jwt.guard";
import {Roles} from "../../../auth/decorators/roles.decorator";
import {RolesEnum} from "../../../auth/roles/roles.enum";

@Controller()
export class CreatureController {
    constructor(
        private readonly creatureService: CreatureService
    ) {
    }


    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Post('creature')
    createCreature(@Request() req, @Body() body: CreaturePayloadDto) {
        return this.creatureService.createOrPatchCreature(req.user.id, body)
    }

    @Get('creature')
    getCreaturesList() {
        return this.creatureService.getCreaturesList(true)
    }

    @Get('creature-unfinished')
    getCreaturesUnfinishedList() {
        return this.creatureService.getCreaturesList(false)
    }

    @Get('creature/:id')
    getCreatureById(@Param('id') id: number) {
        return this.creatureService.getCreatureById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Patch('creature/:id')
    patchCreature(@Param('id') id: number, @Request() req, @Body() body: CreaturePayloadDto) {
        return this.creatureService.createOrPatchCreature(req.user.id, body, id)
    }
}
