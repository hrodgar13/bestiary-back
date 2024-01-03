import {Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express';
import {FileUploadService} from "../services/file-upload.service";

@Controller('file-upload')
export class FileUploadController {

    constructor(private uploadService: FileUploadService) {
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadAvatar(file)
    }

    @UseInterceptors(FileInterceptor('file'))
    @Delete('/remove/:name')
    async removeAvatar(@Param('name') name: string) {
        return this.uploadService.deleteAvatar(name)
    }
}
