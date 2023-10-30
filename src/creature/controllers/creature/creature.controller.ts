import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
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

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    createCreature(@Request() req, @Body() body: CreaturePayloadDto) {
        return this.creatureService.createCreature(req.user.id, body)
    }
}
