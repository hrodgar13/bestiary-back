import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import * as fs from "fs";
import * as mimeTypes from 'mime-types';
import * as path from 'path';
import {UploadFileDto} from "../dtos/file-upload/upload-file.dto";
import { Express } from 'express';

@Injectable()
export class FileUploadService {
    async uploadAvatar(file: Express.Multer.File): Promise<UploadFileDto> {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;

        const mimeType = mimeTypes.lookup(file.originalname);

        if(!mimeType || !mimeType.startsWith('image') || this.isForbiddenMimeType(mimeType)) {
            fs.unlinkSync(file.path);
            throw new HttpException('File must be image', HttpStatus.CONFLICT)
        }

        const destinationPath = './uploads';
        const filePath = `${destinationPath}/${uniqueFileName}`;

        await fs.promises.rename(file.path, filePath);

        return { fileName: uniqueFileName };
    }

    private isForbiddenMimeType(mimeType: string): boolean {
        const forbiddenMimeTypes = ['image/svg+xml', 'image/tiff', 'image/vnd.microsoft.icon', 'image/vnd.wap.wbmp'];
        return forbiddenMimeTypes.includes(mimeType);
    }

    async deleteAvatar(name: string) {
        const storagePath = './uploads';

        const filePath = path.join(storagePath, name)

        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            throw new NotFoundException('File not found');
        }

        return { message: 'File deleted', refreshNotifications: false }
    }
}
