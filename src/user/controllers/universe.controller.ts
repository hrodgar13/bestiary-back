import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UniverseService} from "../services/universe.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {UniverseCategoryDto, UniverseHatDto, UniverseListItemDto} from "../dtos/universe.dto";
import {CreateUniverseDto} from "../dtos/user-profile.dto";
import {UniverseHat} from "../entities/universe-hat.entity";

@Controller('settings')
export class UniverseController {
    constructor(
        private readonly universeService: UniverseService
    ) {
    }

    @Get('universe-list')
    @UseGuards(JwtAuthGuard)
    getUniverseList(@Req() req: any): Promise<UniverseListItemDto[]> {
        return this.universeService.getUniverseList(req.user.id)
    }

    @Post('universe')
    @UseGuards(JwtAuthGuard)
    createUniverse(@Req() req: any): Promise<CreateUniverseDto> {
        return this.universeService.createUniverse(req.user.id)
    }

    @Get('universe/:id')
    @UseGuards(JwtAuthGuard)
    getUniverseById(@Req() req: any, @Param('id') id: number) {
        return this.universeService.getUniverseById(req.user.id, id)
    }

    @Post('universe/:id/hat')
    @UseGuards(JwtAuthGuard)
    createHat(@Req() req: any, @Param('id') id: number, @Body() payload: UniverseHatDto) {
        return this.universeService.createUniverseHat(req.user.id, id, payload)
    }

    @Post('universe/:id/category')
    @UseGuards(JwtAuthGuard)
    createCategory(@Req() req: any, @Param('id') id: number, @Body() payload: UniverseCategoryDto) {
        return this.universeService.createCategory(req.user.id, id, payload)
    }

    @Patch('universe/:id/category')
    @UseGuards(JwtAuthGuard)
    updateCategory(@Req() req: any, @Param('id') id: number, @Body() payload: UniverseCategoryDto) {
        return this.universeService.updateCategory(req.user.id, id, payload)
    }
}
