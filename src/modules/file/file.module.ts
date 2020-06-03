/*
 * @Author: afei
 * @Date: 2020-06-02 10:23:39
 * @Description: 文件模块
 */

import { Module } from "@nestjs/common";
import { FileController } from "./file.contriller";
import { FileService } from './file.service'

@Module({
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule { }