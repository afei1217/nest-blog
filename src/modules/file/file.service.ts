/*
 * @Author: afei
 * @Date: 2020-06-02 10:24:55
 * @Description: 文件服务
 */

import { Injectable } from "@nestjs/common";
import { BaseService } from "../base/base.service";
import { FileDto } from "./file.dto";

import { createWriteStream } from 'fs';
import { FILE } from '@app/app.config'

@Injectable()
export class FileService extends BaseService {

    public async uploadFile(file: FileDto): Promise<any> {

        // 1. 保存文件
        const diskFileName = `${new Date().getTime()}-${file.originalname}`;
        const path = `${FILE.UPLOAD_ROOT}/${diskFileName}`;
        const diskPath = `${FILE.API_PREFIX}/${diskFileName}`;
        const buffer = file.buffer;
        const writeStream = createWriteStream(path);
        writeStream.write(buffer);


        const fileName = file.originalname;
        const size = file.size;
        const mimetype = file.mimetype;
        const userId = 2;

        // 2. 表中增加数据
        const valueSql = `VALUES('${mimetype}', '${size}', '${fileName}', '${diskFileName}', '${diskPath}', '${path}', '${userId}')`;
        const inserSql = `INSERT INTO files(mimetype, size, fileName, diskFileName, diskPath, path, user_id) ${valueSql}`
        const fileInfo = await this.sqlManager.query(inserSql);

        return { path: `${FILE.API_PREFIX}/${diskFileName}`, mimetype, id: fileInfo.insertId };
    }
}