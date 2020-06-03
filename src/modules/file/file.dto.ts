/*
 * @Author: afei
 * @Date: 2020-06-02 14:37:50
 * @Description: 文件dto
 */

import { BaseDto } from "../base/base.dto";

// 注册
export class FileDto extends BaseDto {

    readonly originalname: string;

    readonly mimetype: string;

    readonly buffer: Buffer;

    readonly size: number;

}