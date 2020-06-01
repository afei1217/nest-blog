/*
 * @Author: afei
 * @Date: 2020-06-01 17:42:05
 * @Description: 文章接口参数文件
 */


import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';
import { BaseDto } from '../base/base.dto';

// 文章信息更新
const metadata: string[] = ['id', 'title', 'content', 'abstract', 'cover', 'tag', 'category', 'state'];
export class ArticleUpdateDto extends BaseDto {

    constructor(model: {}) {
        super(metadata, model);
    }

    @IsNotEmpty({ message: 'id不能为空' })
    readonly id: number;

    @IsNotEmpty({ message: '标题不能为空' })
    @MaxLength(100, { message: '邮箱最大长度为100' })
    readonly title: string;

    @IsNotEmpty({ message: '内容不能为空' })
    readonly content: string;

    readonly abstract: string;

    readonly cover: string;

    readonly tag: string;

    readonly category: string;

    readonly state: number;


}