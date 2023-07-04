import {Body, Controller, Post} from "@nestjs/common";
import {CreateFeelModifiersDto} from "../dtos/creature-modifier.dto";
import {CreatureModifierService} from "../services/creature-modifier.service";

@Controller('modifier')
export class CreaturesModifierController {

    constructor(private modifierService: CreatureModifierService) {
    }

    @Post('feel')
    createFeelModifier(@Body() body: CreateFeelModifiersDto) {
        return this.modifierService.createFeelModifier(body)
    }

}