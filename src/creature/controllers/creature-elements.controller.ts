import {Body, Controller, Post} from "@nestjs/common";
import {
    CreateArmorClassDto,
    CreateDamageTypeDto,
    CreateAlignmentDto,
    CreateFeelDto,
    CreateLanguageDto,
    CreateStatBlockDto,
    CreateSavingThrowDto,
    CreateSizeDto,
    CreateSkillDto,
    CreateSpeedTypeDto,
    CreateStatementDto,
    CreateTypeDto
} from "../dtos/create-elements.dto";
import {ElementsService} from "../services/elements.service";

@Controller('elements')
export class CreatureElementsController {
    constructor(private elementsService: ElementsService) {
    }

    @Post('alignment')
    createAlignment(@Body() body: CreateAlignmentDto) {
        return this.elementsService.createAlignment(body)
    }

    @Post('armor-type')
    createArmorType(@Body() body: CreateArmorClassDto) {
        return this.elementsService.createArmorType(body)
    }

    @Post('stat-block')
    createStatBlock(@Body() body: CreateStatBlockDto) {
        return this.elementsService.createStatBlock(body)
    }

    @Post('feel')
    createFeel(@Body() body: CreateFeelDto) {
        return this.elementsService.createFeel(body)
    }

    @Post('damage-type')
    createDamageType(@Body() body: CreateDamageTypeDto) {
        return this.elementsService.createDamageType(body)
    }

    @Post('language')
    createLanguage(@Body() body: CreateLanguageDto) {
        return this.elementsService.createLanguage(body)
    }

    @Post('saving-throw')
    createSavingThrow(@Body() body: CreateSavingThrowDto) {
        return this.elementsService.createSavingThrow(body)
    }

    @Post('size')
    createSize(@Body() body: CreateSizeDto) {
        return this.elementsService.createSize(body)
    }

    @Post('skill')
    createSkill(@Body() body: CreateSkillDto) {
        return this.elementsService.createSkill(body)
    }

    @Post('type')
    createSpeedType(@Body() body: CreateSpeedTypeDto) {
        return this.elementsService.createSpeedType(body)
    }

    @Post('statement')
    createStatement(@Body() body: CreateStatementDto) {
        return this.elementsService.createStatement(body)
    }

    @Post('type')
    createType(@Body() body: CreateTypeDto) {
        return this.elementsService.createType(body)
    }
}