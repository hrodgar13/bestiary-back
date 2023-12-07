import {Body, Controller, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {CreaturePayloadDto} from "../../dtos/income/creature.dto";
import {CreatureService} from "../../services/creature/creature.service";
import {JwtAuthGuard} from "../../../auth/guards/jwt.guard";
import {Roles} from "../../../auth/decorators/roles.decorator";
import {RolesEnum} from "../../../auth/roles/roles.enum";

@Controller('creature')
export class CreatureController {
    constructor(
        private readonly creatureService: CreatureService
    ) {
    }


    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Post()
    createCreature(@Request() req, @Body() body: CreaturePayloadDto) {
        return this.creatureService.createOrPatchCreature(req.user.id, body)
    }

    @Get()
    getCreaturesList() {
        return this.creatureService.getCreaturesList()
    }

    @Get(':id')
    getCreatureById(@Param('id') id: number) {
        return this.creatureService.getCreatureById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Patch(':id')
    patchCreature(@Param('id') id: number, @Request() req, @Body() body: CreaturePayloadDto) {
        return this.creatureService.createOrPatchCreature(req.user.id, body, id)
    }
}
