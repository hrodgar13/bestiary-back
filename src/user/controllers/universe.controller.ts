import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {UniverseService} from "../services/universe.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {UniverseCategoryDto, UniverseCategoryItemDto, UniverseHatDto, UniverseListItemDto} from "../dtos/universe.dto";
import {CreateUniverseDto} from "../dtos/user-profile.dto";
import {Roles} from "../../auth/decorators/roles.decorator";
import {RolesEnum} from "../../auth/roles/roles.enum";
import {CreateTagDto} from "../dtos/create-tag.dto";

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

    @Post('universe/:universeId/category/:categoryId/item')
    @UseGuards(JwtAuthGuard)
    createCategoryItem(@Req() req: any, @Param('universeId') universeId: number, @Param('categoryId') categoryId: number, @Body() payload: UniverseCategoryItemDto) {
        return this.universeService.createCategoryItem(req.user.id, universeId, categoryId, payload)
    }

    @Get('universe/:universeId/category/:categoryId')
    @UseGuards(JwtAuthGuard)
    getCategoryItems(@Req() req: any, @Param('universeId') universeId: number, @Param('categoryId') categoryId: number, @Query('page') page: number, @Query('title') title: string ) {
        return this.universeService.getCategoryItems(req.user.id, universeId, categoryId, page, title)
    }

    @Get('universe/:universeId/category/:categoryId/item/:itemId')
    @UseGuards(JwtAuthGuard)
    getCategoryItemById(@Req() req: any, @Param('universeId') universeId: number, @Param('categoryId') categoryId: number, @Param('itemId') itemId: number) {
        return this.universeService.getCategoryItemById(req.user.id, universeId, categoryId, itemId)
    }

    @Delete('universe/category/item/:categoryItemId')
    @UseGuards(JwtAuthGuard)
    deleteCategoryItemBy(@Req() req: any, @Param('categoryItemId') categoryItemId: number) {
        return this.universeService.deleteCategoryItem(req.user.id, categoryItemId)
    }

    @Delete('/universe/category/:categoryId')
    @UseGuards(JwtAuthGuard)
    deleteCategory(@Req() req: any, @Param('categoryId') categoryId: number) {
        return this.universeService.deleteCategory(req.user.id, categoryId)
    }

    @Delete('universe/:universeId')
    @UseGuards(JwtAuthGuard)
    deleteUniverse(@Req() req: any, @Param('universeId') universeId: number) {
        return this.universeService.deleteUniverse(req.user.id, universeId)
    }

    @Post('universe-tag')
    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    createTag(@Body('body') payload: CreateTagDto) {
        return this.universeService.createTag(payload)
    }

    @Post('universe-tag/apply/:universeId')
    @UseGuards(JwtAuthGuard)
    applyTagToUniverse(@Param('universeId') universeId: number, @Body('tagsIds') tagsIds: number[]) {
        return this.universeService.applyTagToUniverse(universeId, tagsIds)
    }

    @Get('universe-tag')
    @UseGuards(JwtAuthGuard)
    getAllTags(@Query('id') id: number = 0) {
        return this.universeService.getAllTags(id)
    }

    @Delete('universe-tag/:id')
    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    deleteTag(@Param('id') id: number) {
        return this.universeService.deleteTag(id)
    }

    @Patch('universe-tag/:id')
    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    updateTag(@Body('payload') body: CreateTagDto, @Param('id') id: number) {
        return this.universeService.patchTag(body, id)
    }
}
