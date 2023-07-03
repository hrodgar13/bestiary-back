import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ImageUploadService} from "../services/image-upload.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {CreateImagesDto} from "../dtos/images/create-images.dto";

@Controller('upload-creature-image')
export class UploadCreatureImageController {
    constructor(private imageService: ImageUploadService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now();
                const filename = `${uniqueSuffix}_${file.originalname}`;
                callback(null, filename)
            }
        })
    }))
    async uploadImage(@Body('creature_id') creature_id: number,@UploadedFile() file: Express.Multer.File) {
        const image: CreateImagesDto = {name: 'uploads/' + file.filename, creature_id}
        return this.imageService.addImage(image)
    }
}
