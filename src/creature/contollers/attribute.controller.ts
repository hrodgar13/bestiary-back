import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {AttributeService} from "../services/attribute.service";
import {CreateAttributeDto} from "../dtos/create-attribute.dto";

@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {
    }

    @Get(':category')
    getAllAttributesByCategory(@Param('category') category: string) {
        return this.attributeService.getAllAttributesByCategory(category)
    }

    @Get('single/:id')
    getOneAttribute(@Param('id') id: number) {
        return this.attributeService.getOneAttribute(id)
    }

    @Post()
    createAttribute(@Body() body: CreateAttributeDto) {
        return this.attributeService.createPatchAttribute(body)
    }

    @Patch(':id')
    updateOneAttribute(@Body() body: CreateAttributeDto, @Param('id') id: number) {
        return this.attributeService.createPatchAttribute(body, id)
    }

    @Delete(':id')
    deleteAttribute(@Param('id') id: number) {
        return this.attributeService.deleteAttribute(id)
    }
}