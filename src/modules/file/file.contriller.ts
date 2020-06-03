/*
 * @Author: afei
 * @Date: 2020-06-02 10:24:34
 * @Description: 文件控制器
 */



import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common'
import { FileFieldsInterceptor} from '@nestjs/platform-express'

import { FileService } from './file.service'

@Controller('file')
export class FileController {
    constructor(
        private fileService: FileService
    ) { }

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
    public uploadFile(@UploadedFiles() files) {
        files = files.files;
        const fileProise = []
        files.forEach(file => {
            fileProise.push(this.fileService.uploadFile(file))
        });
        return Promise.all(fileProise);
    }
}