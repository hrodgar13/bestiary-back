import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {UniverseService} from "../services/universe.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {UniverseListItemDto} from "../dtos/universe.dto";
import {CreateUniverseDto} from "../dtos/user-profile.dto";

@Controller('settings')
export class UniverseController {
    constructor(
        private readonly universeService: UniverseService
    ) {
    }

    @Get('universe-list')
    @UseGuards(JwtAuthGuard)
    getUniverseList(@Req() req: any): Promise<UniverseListItemDto[]> {
        return this.universeService.getUniverseList(req.sub)
    }

    @Post('universe')
    @UseGuards(JwtAuthGuard)
    createUniverse(@Req() req: any): Promise<CreateUniverseDto> {
        return this.universeService.createUniverse(req.sub)
    }

    @Get('universe/:id')
    @UseGuards(JwtAuthGuard)
    getUniverseById(@Req() req: any, @Param('id') id: number) {
        return this.universeService.getUniverseById(req.sub, id)
    }
}
