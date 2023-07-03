import {Body, Controller, Post} from "@nestjs/common";
import {
    CreateArmorClassDto, CreateDamageType,
    CreateElementsDto,
    CreateFeelDto,
    CreateStatBlockDto
} from "../dtos/create-elements.dto";
import {ElementsService} from "../services/elements.service";

@Controller('elements')
export class CreatureElementsController {
    constructor(private elementsService: ElementsService) {
    }

    @Post('alignment')
    createAlignment(@Body() body: CreateElementsDto) {
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
    createDamageType(@Body() body: CreateDamageType) {
        return this.elementsService.createDamageType(body)
    }
}