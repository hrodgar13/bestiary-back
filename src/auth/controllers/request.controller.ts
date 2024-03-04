import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {RequestService} from "../services/request.service";
import {CreateRequestDto} from "../dtos/create-request.dto";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {Roles} from "../decorators/roles.decorator";
import {RolesEnum} from "../roles/roles.enum";

@Controller('message')
export class RequestController {

    constructor(
        private readonly messageService: RequestService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    createMessage(@Request() req, @Body() body: CreateRequestDto) {
        return this.messageService.createRequest(req.id, body)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Patch('read/:id')
    changeReadStatus(@Param('id') requestId: number) {
        return this.messageService.changeReadStatus(requestId)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Get('total/unread')
    getAmountOfNewMessages() {
        return this.messageService.getAmountOfUnread()
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Get('list')
    getListOfMessages(@Query('perPage') perPage: number, @Query('onlyAdminRequest') onlyAdmin: string) {
        return this.messageService.getListOfMessages(perPage, onlyAdmin)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Delete(':id')
    deleteMessage(@Param('id') id: number) {
        return this.messageService.deleteMessage(id)
    }
}
