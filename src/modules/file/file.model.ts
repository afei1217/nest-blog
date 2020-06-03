/*
 * @Author: afei
 * @Date: 2020-06-02 10:24:10
 * @Description: 文件表
 */

import {
    Column,
    Entity,
} from 'typeorm';
import { BaseModel } from '../base/baseModel'

@Entity('files')
export class FileModel extends BaseModel {
    @Column({
        comment: '文件类型'
    })
    mimetype: string;

    @Column({
        nullable: false,
        default: 0,
        comment: '文件大小'
    })
    size: number;

    @Column({
        comment: '文件名'
    })
    fileName: string;

    @Column({
        comment: '磁盘上文件名'
    })
    diskFileName: string;

    @Column({
        comment: '存储绝对路径'
    })
    diskPath: string;
    @Column({
        comment: '存储相对路径'
    })
    path: string;

    @Column({
        comment: '创建人'
    })
    user_id: number;
}