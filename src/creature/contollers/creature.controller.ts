import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {CreateCreatureDto} from "../dtos/creature/create/create-creature.dto";
import {CreatureService} from "../services/creature.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {Roles} from "../../auth/decorators/roles.decorator";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {RolesEnum} from "../../auth/roles/roles.enum";

@Controller('creature')
export class CreatureController {

    constructor(
        private creatureService: CreatureService
    ) {
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    createBeast(@Body() createBeast: CreateCreatureDto) {
        return this.creatureService.createBeast(createBeast)
    }

    @Patch(':id')
    patchBeast(@Param('id') id: number, @Body() body: CreateCreatureDto) {
        return this.creatureService.patchBeast(body, id)
    }

    @Get('list')
    getCreaturesList(@Query('finished') finished: string,@Query('perPage') perPage: number, @Query('search') search: string, @Query() queryParams,) {

        return this.creatureService.getCreaturesList(finished, perPage, search, queryParams)
    }

    @Get('list/:id')
    getOneCreature(@Param('id') id: number) {
        return this.creatureService.getOneCreature(id)
    }
}