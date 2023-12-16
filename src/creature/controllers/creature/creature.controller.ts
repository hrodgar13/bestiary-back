import {Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {CreaturePayloadDto} from "../../dtos/income/creature.dto";
import {CreatureService} from "../../services/creature/creature.service";
import {JwtAuthGuard} from "../../../auth/guards/jwt.guard";
import {Roles} from "../../../auth/decorators/roles.decorator";
import {RolesEnum} from "../../../auth/roles/roles.enum";
import {CreatureFilter} from "../../dtos/income/filters/creature-filter.dto";

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
    getCreaturesList(@Query('alignment') alignment: string, @Query('type') type: string, @Query('size') size: string, @Query('armorType') armorType: string, @Query('speeds') speeds: string, @Query('immunities') immunities: string, @Query('resists') resists: string, @Query('vulnerabilities') vulnerabilities: string,@Query('feelings') feelings: string, @Query('savingThrows') savingThrows: string, @Query('skills') skills: string, @Query('conditionsImmunities') conditionsImmunities: string,@Query('languages') languages: string, @Query('regions') regions: string) {
        const filters: CreatureFilter = {
            alignment: alignment ? alignment.split(',').map(Number) : [],
            type: type ? type.split(',').map(Number): [],
            size: size ? size.split(',').map(Number): [],
            armorTag: armorType ? armorType.split(',').map(Number): [],
            speeds_MSR: speeds ? speeds.split(',').map(Number): [],
            immunities_MSR: immunities ? immunities.split(',').map(Number): [],
            resists_MSR: resists ? resists.split(',').map(Number): [],
            vulnerabilities_MSR: vulnerabilities ? vulnerabilities.split(',').map(Number): [],
            feelings_MSR: feelings ? feelings.split(',').map(Number): [],
            savingThrows_MSR: savingThrows ? savingThrows.split(',').map(Number): [],
            skills_MSR: skills ? skills.split(',').map(Number) : [],
            conditionsImmunities_MSR: conditionsImmunities ? conditionsImmunities.split(',').map(Number): [],
            languages_MSR: languages ? languages.split(',').map(Number): [],
            regions_MSR: regions ? regions.split(',').map(Number): [],
        }

        return this.creatureService.getCreaturesList(true, filters)
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
